library(shiny)

ui <- fluidPage(
  titlePanel("R Code Executor"),
  sidebarLayout(
    sidebarPanel(
      textAreaInput("rcode", "Enter R code:", value = "", rows = 5),
      actionButton("runButton", "Run Code")
    ),
    mainPanel(
      verbatimTextOutput("result")
    )
  )
)

server <- function(input, output) {
  observeEvent(input$runButton, {
    code <- input$rcode
    result <- try(eval(parse(text = code)), silent = TRUE)
    
    if (inherits(result, "try-error")) {
      output$result <- renderText(paste("Error:", as.character(result)))
    } else {
      output$result <- renderText(paste("Result:", as.character(result)))
    }
  })
}

shinyApp(ui, server)

