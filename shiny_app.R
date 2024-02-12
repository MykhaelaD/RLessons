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
  
  # Function to install and load packages dynamically
  installAndLoadPackage <- function(package_name) {
    if (!requireNamespace(package_name, quietly = TRUE)) {
      install.packages(package_name, dependencies = TRUE)
    }
    library(package_name, character.only = TRUE)
  }
  
  observeEvent(input$installButton, {
    package_name <- isolate(input$package)
    installAndLoadPackage(package_name)
    output$result <- renderText(paste("Installed and loaded package:", package_name))
  })
}

shinyApp(ui, server)

