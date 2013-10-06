
function calculateDuration() {
    
    var costProperty = $("#costProperty").val();
    costProperty = parseFloat(costProperty);
    var availableCapital = $("#availableCapital").val();
    availableCapital = parseFloat(availableCapital);
    var monthlyBudget = $("#monthlyBudget").val();
    monthlyBudget = parseFloat(monthlyBudget);
    var monthlyRent = $("#monthlyRent").val();
    monthlyRent = parseFloat(monthlyRent);

    requiredCapital = parseFloat(costProperty) - parseFloat(availableCapital);
    $("#requiredCapital").text(requiredCapital +" €");
    
    var requiredInvestors = 0;
    var averageContribution = 0;
    
    if (requiredCapital >= 50000){
        averageContribution = 5000;
        requiredInvestors = requiredCapital / averageContribution;
    }else if (requiredCapital >= 5000){
        requiredInvestors = 10;
        averageContribution = requiredCapital / requiredInvestors;
    }else if (requiredCapital < 5000){
        requiredInvestors = 5;
        averageContribution = requiredCapital / requiredInvestors;
    }
    
    $("#requiredInvestors").text(requiredInvestors);
    $("#averageContribution").text(averageContribution + " €");
    
    var monthsToPayLoanBack = Math.ceil(requiredCapital / monthlyBudget);
    console.log("monthsToPayLoanBack: " + monthsToPayLoanBack);

    var shareHolderPercentageAtMonthN = new Array();
    var loanAtMonthN = new Array();
        var shareHolderProfitAtMonthN = new Array();
    loanAtMonthN[0] = requiredCapital;
    shareHolderPercentageAtMonthN[0] = loanAtMonthN[0] / costProperty; 
    shareHolderProfitAtMonthN[0] = shareHolderPercentageAtMonthN[0] * monthlyRent;
    var totalProfitToPay = 0;
    for (var n=1;n<=monthsToPayLoanBack;n++){
        loanAtMonthN[n] = loanAtMonthN[n-1] - monthlyBudget;
        shareHolderPercentageAtMonthN[n] = loanAtMonthN[n] / costProperty; 
        shareHolderProfitAtMonthN[n] = shareHolderPercentageAtMonthN[n] * monthlyRent;
        totalProfitToPay = totalProfitToPay + shareHolderProfitAtMonthN[n];
   }
   
   totalProfitToPay = Math.ceil(totalProfitToPay);

    var monthsToPayProfit = Math.ceil(totalProfitToPay / monthlyBudget);
    console.log("monthsToPayProfit: " + monthsToPayProfit);
  
    var totalMonths = monthsToPayLoanBack + monthsToPayProfit;
    var totalYears = Math.floor(totalMonths/ 12); 
    var remainderMonths = totalMonths % 12;
    console.log("total Duration: " + totalYears + " Years and " + remainderMonths + " Months");
    if (remainderMonths<=6 && remainderMonths>0)
        totalYears = totalYears + 0.5;
    else if (remainderMonths>6)
        totalYears = totalYears + 1;
    $("#totalDuration").text(totalYears + " Years");  
    $("#totalProfitToPay").text(totalProfitToPay + " €");
    var totalCost = Math.ceil(requiredCapital + totalProfitToPay);
    $("#totalAmountToPay").text(totalCost + " €");
    

        
    
    
    };