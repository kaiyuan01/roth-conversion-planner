
export default class Utils {
    static calcTax(taxableIncome: number) { 
        /* tax brackets 2024
          10.0%	  12.0%	  22.0%	  24.0%	  32.0%	  35.0%	  37.0%
          $23200  $94300  $201050	$383900	$487450	$731200	
          $2320	  $8532	  $23485	$43884	$33136	$85313	
         */

          const TAX_BRACKET_1_INCOME_MAX = 23200,
                TAX_BRACKET_1_TAX_MAX = 2320,
                TAX_BRACKET_2_INCOME_MAX = 94300,
                TAX_BRACKET_2_TAX_MAX = 8532,
                TAX_BRACKET_3_INCOME_MAX = 201050,
                TAX_BRACKET_3_TAX_MAX = 23485,
                TAX_BRACKET_4_INCOME_MAX = 383900,
                TAX_BRACKET_4_TAX_MAX = 43884,
                TAX_BRACKET_5_INCOME_MAX = 487450,
                TAX_BRACKET_5_TAX_MAX = 33136, //???
                TAX_BRACKET_6_INCOME_MAX = 731200,
                TAX_BRACKET_6_TAX_MAX = 85313;


          let tax_final: number = 0;

          if (taxableIncome >= TAX_BRACKET_1_INCOME_MAX) {
            tax_final += TAX_BRACKET_1_INCOME_MAX * 0.10 ;
            if(taxableIncome >= TAX_BRACKET_2_INCOME_MAX) {
              tax_final += (TAX_BRACKET_2_INCOME_MAX - TAX_BRACKET_1_INCOME_MAX)*0.12;

              if(taxableIncome >= TAX_BRACKET_3_INCOME_MAX) {
                tax_final += (TAX_BRACKET_3_INCOME_MAX - TAX_BRACKET_2_INCOME_MAX)*0.22;
                console.log("tax_final now,  at >=22.0% :", tax_final, ", taxableIncome: ", taxableIncome, ", TAX_BRACKET_3_INCOME_MAX: ", TAX_BRACKET_3_INCOME_MAX);
                if(taxableIncome >= TAX_BRACKET_4_INCOME_MAX) {
                  tax_final += (TAX_BRACKET_4_INCOME_MAX- TAX_BRACKET_3_INCOME_MAX)*0.24;
                  if(taxableIncome >= TAX_BRACKET_5_INCOME_MAX) {
                    tax_final += (TAX_BRACKET_5_INCOME_MAX-TAX_BRACKET_4_INCOME_MAX)*0.32;
                    if(taxableIncome >= TAX_BRACKET_6_INCOME_MAX) {
                      tax_final += (TAX_BRACKET_6_INCOME_MAX-TAX_BRACKET_3_INCOME_MAX)*0.35;
                      
                    }
                    else { //6
                      let tax = (taxableIncome - TAX_BRACKET_5_INCOME_MAX - TAX_BRACKET_4_INCOME_MAX - TAX_BRACKET_3_INCOME_MAX - TAX_BRACKET_2_INCOME_MAX - TAX_BRACKET_1_INCOME_MAX) * 0.35;
                      return  (tax < 0) ? tax_final : tax_final + tax; 
                    }
                  }
                  else { //5
                    let tax = (taxableIncome - TAX_BRACKET_4_INCOME_MAX - TAX_BRACKET_3_INCOME_MAX - TAX_BRACKET_2_INCOME_MAX - TAX_BRACKET_1_INCOME_MAX) * 0.32;
                    return  (tax < 0) ? tax_final : tax_final + tax; 
                  }

                }
                else { //4
                  let tax = (taxableIncome - TAX_BRACKET_3_INCOME_MAX - TAX_BRACKET_2_INCOME_MAX - TAX_BRACKET_1_INCOME_MAX) * 0.24;
                  console.log("tax is: ", tax);
                  tax_final = (tax < 0) ? tax_final : tax_final + tax;                   
                  return tax_final;
                }
             
              }
              else { //3
                let tax = (taxableIncome - TAX_BRACKET_2_INCOME_MAX - TAX_BRACKET_1_INCOME_MAX) * 0.22;
                console.log("tax_final, stopped at <22.0% :", tax_final, ", taxableIncome: ", taxableIncome, ", TAX_BRACKET_3_INCOME_MAX: ", TAX_BRACKET_3_INCOME_MAX);
                return  (tax < 0) ? tax_final : tax_final + tax; 
              }
            }
            else {//2
              let tax = (taxableIncome - TAX_BRACKET_1_INCOME_MAX) * 0.12;
              return  (tax < 0) ? tax_final : tax_final + tax; 
            }
          }
          else {//1
            let tax = taxableIncome * 0.10;
            return  (tax < 0) ? tax_final : tax_final + tax; 
          }

          console.log("*** tax_final now,  B4 ret:", tax_final, ", taxableIncome: ", taxableIncome, ", TAX_BRACKET_3_INCOME_MAX: ", TAX_BRACKET_3_INCOME_MAX);
          return tax_final;
    }

    static doSomethingElse(val: string) { return val; }
}
