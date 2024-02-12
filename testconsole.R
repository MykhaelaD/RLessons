server <- function(input, output, session) {
  
  observeEvent(input$runButton, {
    code <- input$rcode
    result <- try(eval(parse(text = code)), silent = TRUE)
    
    if (inherits(result, "try-error")) {
      output$result <- renderPrint(paste("Error:", as.character(result)))
    } else {
      output$result <- renderPrint(paste("Result:", as.character(result)))
    }
  })
  
  observe({
    code <- input$rcode
    if ("install.packages" %in% code) {
      output$result <- renderPrint("Package installation not supported in this console.")
    } else if ("library" %in% code) {
      output$result <- renderPrint("Library loading not supported in this console.")
    }
  })
  
  output$plot <- renderPlot({
    code <- input$rcode
    if ("plot" %in% code || "ggplot" %in% code) {
      try({
        # Attempt to evaluate the code to generate a plot
        eval(parse(text = code))
      }, silent = TRUE)
    }
  })
}

