library(shiny)
library(yaml)

# Read the YAML file
yaml_file_path <- "lesson1.yaml"
if (file.exists(yaml_file_path)) {
  lesson_data <- yaml.load_file(yaml_file_path)
} else {
  stop("YAML file not found or path is incorrect.")
}

# Extract questions
questions <- lesson_data[sapply(lesson_data, function(x) {
  "Class" %in% names(x) && (x[["Class"]] == "cmd_question" || x[["Class"]] == "mult_question")
})]

# Extract texts
texts <- lesson_data[sapply(lesson_data, function(x) {
  "Class" %in% names(x) && x[["Class"]] == "text"
})]

# Filter out meta lines
lesson_data <- lesson_data[sapply(lesson_data, function(x) {
  "Class" %in% names(x) && x[["Class"]] != "meta"
})]

ui <- fluidPage(
  titlePanel("Lesson"),
  mainPanel(
    uiOutput("content"),
    uiOutput("continue"),
    actionButton("back", "Back"),
    actionButton("submit_lesson", "Submit Lesson", style = "display: none;")
  )
)

server <- function(input, output, session) {
  # Track the current content index
  current_index <- reactiveVal(1)
  
  # Track the number of incorrect attempts
  incorrect_attempts <- reactiveVal(0)
  
  # Track lesson completion
  lesson_completed <- reactiveVal(FALSE)
  
  output$content <- renderUI({
    content_index <- current_index()
    if (content_index > 0 && content_index <= length(lesson_data)) {
      content <- lesson_data[[content_index]]
      if (content$Class == "text") {
        tagList(
          p(content$Output)
        )
      } else if (content$Class %in% c("cmd_question", "mult_question")) {
        if (content$Class == "cmd_question") {
          tagList(
            textInput("answer", label = content$Output, value = ""),
            actionButton("submit", "Submit Answer"),
            actionButton("skip", "Skip")
          )
        } else if (content$Class == "mult_question") {
          tagList(
            p(content$Output),
            p("Here are your answer choices:"),
            renderUI({
              lapply(content$AnswerChoices, function(choice) {
                p(choice)
              })
            }),
            textInput("answer", label = "Type your answer here:", value = ""),
            actionButton("submit", "Submit Answer"),
            actionButton("skip", "Skip")
          )
        }
      }
    }
  })
  
  output$continue <- renderUI({
    content_index <- current_index()
    if (content_index > 0 && content_index <= length(lesson_data)) {
      content <- lesson_data[[content_index]]
      if (content$Class == "text") {
        actionButton("continue", "Continue")
      } else {
        NULL
      }
    }
  })
  
  observeEvent(input$continue, {
    if (current_index() == length(lesson_data)) {
      # Show the submit lesson button at the end of the lesson
      shinyjs::show("submit_lesson")
    }
  })
  
  # Check the submitted answer
  observeEvent(input$submit, {
    answer <- input$answer
    question <- lesson_data[[current_index()]]  # Get the current question based on current_index()
    if (question$Class %in% c("cmd_question", "mult_question")) {
      if (question$Class == "cmd_question") {
        if (identical(answer, question$CorrectAnswer)) {
          showModal(modalDialog(
            title = "Correct!",
            "Well done! Your answer is correct.",
            easyClose = TRUE
          ))
          # Move to the next question
          if (current_index() < length(lesson_data)) {
            current_index(current_index() + 1)
            incorrect_attempts(0)  # Reset incorrect attempts counter
          } else {
            showModal(modalDialog(
              title = "End of Lesson",
              "You have reached the end of the lesson.",
              easyClose = TRUE
            ))
          }
        } else {
          incorrect_attempts(incorrect_attempts() + 1)
          if (incorrect_attempts() >= 2) {
            showModal(modalDialog(
              title = "Hint",
              question$Hint,
              easyClose = TRUE
            ))
            incorrect_attempts(0)  # Reset incorrect attempts counter
          } else {
            showModal(modalDialog(
              title = "Incorrect!",
              "Oops! Your answer is incorrect. Try again.",
              easyClose = TRUE
            ))
          }
        }
      } else if (question$Class == "mult_question") {
        if (answer %in% question$CorrectAnswer) {  # Check if answer is in correct choices
          showModal(modalDialog(
            title = "Correct!",
            "Well done! Your answer is correct.",
            easyClose = TRUE
          ))
          # Move to the next question
          if (current_index() < length(lesson_data)) {
            current_index(current_index() + 1)
            incorrect_attempts(0)  # Reset incorrect attempts counter
          } else {
            showModal(modalDialog(
              title = "End of Lesson",
              "You have reached the end of the lesson.",
              easyClose = TRUE
            ))
          }
        } else {
          incorrect_attempts(incorrect_attempts() + 1)
          if (incorrect_attempts() >= 2) {
            showModal(modalDialog(
              title = "Hint",
              question$Hint,
              easyClose = TRUE
            ))
            incorrect_attempts(0)  # Reset incorrect attempts counter
          } else {
            showModal(modalDialog(
              title = "Incorrect!",
              "Oops! Your answer is incorrect. Try again.",
              easyClose = TRUE
            ))
          }
        }
      }
    }
  })
  
  # Move to the previous content
  observeEvent(input$back, {
    if (current_index() > 1) {
      current_index(current_index() - 1)
    }
  })
  
  # Move to the next content
  observeEvent(input$continue, {
    if (current_index() < length(lesson_data)) {
      current_index(current_index() + 1)
    } else {
      showModal(modalDialog(
        title = "End of Lesson",
        "You have reached the end of the lesson.",
        easyClose = TRUE
      ))
    }
  })
  
  # Skip to the next question
  observeEvent(input$skip, {
    if (current_index() < length(lesson_data)) {
      current_index(current_index() + 1)
    } else {
      showModal(modalDialog(
        title = "End of Lesson",
        "You have reached the end of the lesson.",
        easyClose = TRUE
      ))
    }
  })
  
  # Submit the lesson
  observeEvent(input$submit_lesson, {
    if (lesson_completed()) {
      # Send email to the professor
      send_email_to_professor()
      # Close the lesson
      # You can implement the closing logic here, such as redirecting to another page
    }
  })
  
  # Function to send email to professor
  send_email_to_professor <- function() {
    # Get the username from Shiny input value
    username <- isolate(input$selected_username)
    # Compose email
    body <- paste("The student", username, "has completed the lesson.")
    email <- "mykhaela17@yahoo.com"  # Replace with professor's email address
    subject <- "Lesson Completion Notification"
    send.mail(from = "sender@example.com",
              to = email,
              subject = subject,
              body = body,
              smtp = list(host.name = "smtp.example.com"))
  }
  
}

shinyApp(ui, server)
