let from="", to="", number="", url;
url=document.URL;
for(let i=0; i<url.length; i++)
{
    if(url[i]=='f' && url[i+1]=='r' && url[i+2]=='o' && url[i+3]=='m' && url[i+4]=='=')
    {
        for(let j=i+5; url[j]!='&'; j++)
        {
            from+=url[j];
        }
    }
    if(url[i]=='t' && url[i+1]=='o' && url[i+2]=='=')
    {
        for(let j=i+3; url[j]!='&'; j++)
        {
            to+=url[j];
        }
    }
    if(url[i]=='n' && url[i+1]=='u' && url[i+2]=='m' && url[i+3]=='b' && url[i+4]=='e' && 
    url[i+5]=='r' && url[i+6]=='=')
    {
        for(let j=i+7; url[j]!=undefined; j++)
        {
            number+=url[j];
        }
    }
}
console.log(from+' to '+to+'; number is: '+number)
let result=run(from, to, number);
if(result!=undefined)
{
    console.log(result)
    document.getElementById("result").innerHTML=result;
}
function run(from, to, number)
{
    let isValidNumber=true;
    if (from=="dec" && to=="bin") 
    {
        for(let i=0; i<number.length; i++)
        {
            if(number.charCodeAt(i)<48 || number.charCodeAt(i)>57)
            {
                isValidNumber=false
            }
        }
        if(isValidNumber)
        {
            return divideByTetrads(convertToBinary(number));
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }
    else if (from=="bin" && to=="dec")
    {
        for(let i=0; i<number.length; i++)
        {
            if((number.charCodeAt(i)<48 || number.charCodeAt(i)>49) && number.charCodeAt(i)!=43)
            {
                isValidNumber=false
            }
        }
        if(isValidNumber)
        {
            return convertToDecimal(normalizeBin(number));
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }   
    else if (from=="dec" && to=="hex")
    {
        for(let i=0; i<number.length; i++)
        {
            if(number.charCodeAt(i)<48 || number.charCodeAt(i)>57)
            {
                validNumber=false
            }
        }
        if(isValidNumber)
        {
            return convertToHexadecimal(convertToBinary(number));
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }
    else if (from=="bin" && to=="hex")
    {
        for(let i=0; i<number.length; i++)
        {
            if((number.charCodeAt(i)<48 || number.charCodeAt(i)>49) && number.charCodeAt(i)!=43)
            {
                isValidNumber=false
            }
        }
        if(isValidNumber)
        {
            return convertToHexadecimal(normalizeBin(number))
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }
    else if (from=="hex" && to=="dec")
    {
        for(let i=0; i<number.length; i++)
        {
            if((number.charCodeAt(i)<48 || number.charCodeAt(i)>57) &&
            (number.charCodeAt(i)<65 || number.charCodeAt(i)>70) && 
            (number.charCodeAt(i)<97 || number.charCodeAt(i)>102))
            {
                isValidNumber=false
            }
        }
        if(isValidNumber)
        {
            return convertToDecimal(convertToBinaryFromHex(number));
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }
    else if (from=="hex" && to=="bin")
    {
        for(let i=0; i<number.length; i++)
        {
            if((number.charCodeAt(i)<48 || number.charCodeAt(i)>57) &&
            (number.charCodeAt(i)<65 || number.charCodeAt(i)>70) && 
            (number.charCodeAt(i)<97 || number.charCodeAt(i)>102))
            {
                isValidNumber=false
            }
        }
        if(isValidNumber)
        {
            return divideByTetrads(convertToBinaryFromHex(number));
        }
        else
        {
            isValidNumber=true
            return "Invalid Number"
        }
    }
    else if (from==to && (to=="dec" || to=="bin" || to=="hex"))
    {
        return "Choose different number systems"
    }
    else if (to!="dec" && to!="bin" && to!="hex")
    {
        return "None"
    }
    else return "Unknown Error"
}
function convertToDecimal(bin)
{
    let result=0, string=""
    for (let i=0; i<bin.length; i++)
    {
        string+=bin[i];
    }
    for (let i=0; i<string.length; i++)
    {
        if (string[i]==1)
        {
            result+=Math.pow (2, string.length-i-1);
        }
    }
    return result
}
function convertToBinary(dec)
{
    let bin=[], string="", x=0
    if (dec==0)
    {
        bin[0]=0;
    }
    else
    {
        for (let i=0; x!=1; i++)
        {
            if (dec==1)
            {
                bin[i]=1
                x=1
                continue
            }
            if (dec%2 == 1)
            {
                bin[i]=1
                dec=dec/2
                dec=dec-0.5
            }
            else if (dec%2 == 0)
            {
                bin[i]=0
                dec=dec/2
            }
            
        }
    }
    if(bin.length>4)
    {
        for(let i=bin.length%4; i!=4; i++)
        {
            if (i==0)
            {
                break
            }
            string+="0"
        }
    }
    else
    {
        for(let i=4-bin.length; i!=0; i--)
        {
            string+="0"
        }
    }
    for (let i=bin.length-1; i>-1; i--)
    {
        string+=bin[i]
    }
    return string
}
function convertToHexadecimal(bin)
{
    let tetradAmount=bin.length/4, string="", currentTetrad="";
    let i=0
    while(i<bin.length) 
    {
        for(let j=0; j<4; j++)
        {
            currentTetrad+=bin[i+j]
        }
        let currentDecimal=convertToDecimal(currentTetrad)
        switch(currentDecimal)
        {
            case 0: 
            string+="0";
            break;
            case 1: 
            string+="1";
            break;
            case 2: 
            string+="2";
            break;
            case 3: 
            string+="3";
            break;
            case 4: 
            string+="4";
            break;
            case 5: 
            string+="5";
            break;
            case 6: 
            string+="6";
            break;
            case 7: 
            string+="7";
            break;
            case 8: 
            string+="8";
            break;
            case 9: 
            string+="9";
            break;
            case 10: 
            string+="A";
            break;
            case 11: 
            string+="B";
            break;
            case 12: 
            string+="C";
            break;
            case 13: 
            string+="D";
            break;
            case 14: 
            string+="E";
            break;
            case 15: 
            string+="F";
            break;
        }
        i+=4
        currentTetrad=0
    }
    return string
}
function convertToBinaryFromHex(hex)
{
    let bin=""
    for(let i=0; i<hex.length; i++)
    {
        switch(hex[i])
        {
            case "0": 
            bin+="0000";
            break;
            case "1": 
            bin+="0001";
            break;
            case "2": 
            bin+="0010"
            break;
            case "3": 
            bin+="0011"
            break;
            case "4": 
            bin+="0100";
            break;
            case "5": 
            bin+="0101";
            break;
            case "6": 
            bin+="0110";
            break;
            case "7": 
            bin+="0111";
            break;
            case "8": 
            bin+="1000";
            break;
            case "9": 
            bin+="1001";
            break;
            case "A": 
            bin+="1010";
            break;
            case "a": 
            bin+="1010";
            break;
            case "B": 
            bin+="1011";
            break;
            case "b": 
            bin+="1011";
            break;
            case "C": 
            bin+="1100";
            break;
            case "c": 
            bin+="1100";
            break;
            case "D": 
            bin+="1101";
            break;
            case "d": 
            bin+="1101";
            break;
            case "E": 
            bin+="1110";
            break;
            case "e": 
            bin+="1110";
            break;
            case "F": 
            bin+="1111"
            break;
            case "f": 
            bin+="1111"
            break;
        }
    }
    return bin
}
function divideByTetrads(bin)
{
    let string="";
    for(let i=1; i<bin.length+1; i++)
    {
        string+=bin[i-1];
        if (i%4==0)
        {
            string+=" ";
        }
    }
    return string
}
function normalizeBin(bin)
{
    let string="", result="", startNumber, resultLength;
    for(let i=0; i<bin.length; i++)
    {
        if(bin[i]=='1')
        {
            startNumber=i;
            break;
        }
    }
    for(let i=startNumber; i<bin.length; i++)
    {
        if (bin.charCodeAt(i)==43)
        {
            continue
        }
        else string+=bin[i]
    }
    if (string.length%4!=0) 
    {
        resultLength=string.length;
        while(resultLength%4!=0)
        {
            resultLength++
        }
    }
    else resultLength=string.length
    for(let i=resultLength-string.length; i!=0; i--)
    {
        result+='0'
    }
    for(let i=0; i<string.length; i++)
    {
        result+=string[i]
    }
    return result
}