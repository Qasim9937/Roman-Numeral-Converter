const conversions = {
  one : 'I',
  four : 'IV',
  five : 'V',
  nine : 'IX',
  ten : 'X', 
  forty : 'XL',
  fifty : 'L',
  ninety : 'XC',
  hundred : 'C',
  fourHundred : 'CD',
  fiveHundred : 'D',
  nineHundred : 'CM',
  thousand : 'M'
};

const formInput = document.getElementById('form-input');

const input = document.getElementById('number');
const output = document.getElementById('output');

const submitBtn = document.getElementById('submit-btn');

formInput.addEventListener('submit', function(e){
  e.preventDefault();
  const inputValue = input.value
  const numInput = parseInt(inputValue.trim())  

  if(numInput){
    if(numInput < 10){
      numInput >= 1 ? output.textContent = convertUnit(numInput) : output.innerText = 'Please enter a number greater than or equal to 1';
  }else if(numInput >= 10 && numInput < 100){
    output.textContent = convertTens(numInput);  
  }else if(numInput >= 100 && numInput < 1000){
    output.textContent = convertHundreds(numInput)
  }else if(numInput >= 1000){
    output.textContent = convertThousands(numInput)
  }
    
   }else{
    output.textContent = 'Please enter a valid number'
   }
  })


const convertUnit = (num) => {
  if(num < 10 && num > 0){
    if(num === 9){
    return(conversions.nine)
  }else if(num > 5){
    return(conversions.five + conversions.one.repeat(num - 5))
  }else if(num === 5){
    return(conversions.five)
  }else if(num === 4){
    return(conversions.four)
  }else if(num < 4 && num >= 1){
    return(conversions.one.repeat(num));
  
  }
 }
}

const convertTens = (num) =>{
  if(num >= 10 && num < 100){
    if(num >= 90){
      return num > 90 ? conversions.ninety + convertUnit(num % 10) : conversions.ninety
    }
    
    else if(num >= 50 && num < 90){
      return num >= 50 && num % 10 > 0 ? conversions.fifty + conversions.ten.repeat(Math.floor((num - 50) / 10)) + convertUnit(num % 10) : conversions.fifty + conversions.ten.repeat(Math.floor((num - 50) / 10))
    }
    
    else if(num >= 40 && num < 50){
      return num > 40 ? conversions.forty + convertUnit(num % 10) : conversions.forty
    }
    
    else if(num >= 10 && num < 40){
      return num >= 10 && num % 10 > 0 ? conversions.ten.repeat(Math.floor(num / 10)) + convertUnit(num % 10) : conversions.ten.repeat(Math.floor(num / 10))
  }
 }
}


const convertHundreds = (num) => {
  if(num >= 100 && num < 1000){
    if(num > 900){
      return num > 900 && (num % 100) >= 10 ? conversions.nineHundred + convertTens(num % 100): conversions.nineHundred + convertUnit(num % 100)
    }
    
    else if(num === 900){
      return conversions.nineHundred
    }
    
    else if(num > 500 && num < 900 && (num % 100) != 0){
      return num > 500 && (num % 100) >= 10 ? conversions.fiveHundred + conversions.hundred.repeat(Math.floor((num - 500) / 100)) + convertTens(num % 100) : conversions.fiveHundred + conversions.hundred.repeat(Math.floor((num - 500) / 100)) + convertUnit(num % 100)
  }
  
  else if(num >= 500 && num < 900 && (num % 100) == 0){
    return num > 500 ? conversions.fiveHundred + conversions.hundred.repeat(Math.floor((num - 500) / 100)) : conversions.fiveHundred
  }
  
  else if(num > 400 && num < 500){
    return num > 400 && num % 100 >= 10 ? conversions.fourHundred + convertTens(num % 100) : conversions.fourHundred + convertUnit(num % 100)
  }
  
  else if(num === 400){
    return conversions.fourHundred
  }
  
  else if(num < 400 && (num % 100) != 0){
    return num > 100 && num % 100 >= 10 ? conversions.hundred.repeat(Math.floor((num / 100))) + convertTens(num % 100) : conversions.hundred.repeat(Math.floor((num / 100))) + convertUnit(num % 100)
  }
  
  else if(num >= 100 && num < 400 && (num % 100) == 0){
    return num > 100 ? conversions.hundred.repeat(num / 100) : conversions.hundred
  
  }
 }
}



const convertThousands = (num) => {
  if(num >= 1000 && num < 4000){
    if(num > 1000 && num < 4000){
      if(num % 1000 >= 100){
        return conversions.thousand.repeat(Math.floor(num / 1000)) + convertHundreds(num % 1000)
      }else if(num % 1000 >= 10){
        return conversions.thousand.repeat(Math.floor(num / 1000)) + convertTens(num % 1000) 
      }else{
        return num % 1000 >= 1 ? conversions.thousand.repeat(Math.floor(num / 1000)) + convertUnit(num % 1000) : conversions.thousand.repeat(Math.floor(num / 1000))
      }
    }else{
      return conversions.thousand
    }
  }else{
     return 'Please enter a number less than or equal to 3999'
  }
}