function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const nhifDeduction = calculateNHIF(grossSalary);
    const nssfDeduction = calculateNSSF(basicSalary);
    const taxableIncome = grossSalary - nssfDeduction;
    const payeTax = calculatePAYE(taxableIncome);
    const netSalary = grossSalary - nhifDeduction - nssfDeduction - payeTax;

    return {
        grossSalary: grossSalary,
        nhifDeduction: nhifDeduction,
        nssfDeduction: nssfDeduction,
        payeTax: payeTax,
        netSalary: netSalary
    };
}

function calculateNHIF(grossSalary) {
    if (grossSalary <= 5999) return 150;
    if (grossSalary <= 7999) return 300;
    if (grossSalary <= 11999) return 400;
    if (grossSalary <= 14999) return 500;
    if (grossSalary <= 19999) return 600;
    if (grossSalary <= 24999) return 750;
    if (grossSalary <= 29999) return 850;
    if (grossSalary <= 34999) return 900;
    if (grossSalary <= 39999) return 950;
    if (grossSalary <= 44999) return 1000;
    if (grossSalary <= 49999) return 1100;
    if (grossSalary <= 59999) return 1200;
    if (grossSalary <= 69999) return 1300;
    if (grossSalary <= 79999) return 1400;
    if (grossSalary <= 89999) return 1500;
    if (grossSalary <= 99999) return 1600;
    return 1700;
}

function calculateNSSF(basicSalary) {
    const tier1 = Math.min(basicSalary, 7000) * 0.06;
    const tier2 = Math.min(Math.max(basicSalary - 7000, 0), 36000) * 0.06;
    return tier1 + tier2;
}

function calculatePAYE(taxableIncome) {
    if (taxableIncome <= 24000) return taxableIncome * 0.1;
    if (taxableIncome <= 32333) return 2400 + (taxableIncome - 24000) * 0.25;
    if (taxableIncome <= 500000) return 2400 + 2083.25 + (taxableIncome - 32333) * 0.30;
    if (taxableIncome <= 800000) return 2400 + 2083.25 + 140000.1 + (taxableIncome - 500000) * 0.325;
    return 2400 + 2083.25 + 140000.1 + 97500 + (taxableIncome - 800000) * 0.35;
}

// Example usage
const basicSalary = 50000;
const benefits = 10000;
const salaryDetails = calculateNetSalary(basicSalary, benefits);

console.log(salaryDetails);
