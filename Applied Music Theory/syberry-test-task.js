function intervalConstruction(arr)
{
    let interval = arr[0],
    note = arr[1],
    ascending = arr[2],
    semitone = 0,
    degrees = 0,
    letter,
    letterid = 0,
    count = 0,
    oldletterid = 0;
    (!ascending || ascending == '' || ascending == 'asc') ? ascending = 1 : ascending = 0;    
    switch(interval)
    {
        case 'm2': semitone = 1, degrees = 2; break;
        case 'M2': semitone = 2, degrees = 2; break;
        case 'm3': semitone = 3, degrees = 3; break;
        case 'M3': semitone = 4, degrees = 3; break;                        
        case 'P4': semitone = 5, degrees = 4; break;
        case 'P5': semitone = 7, degrees = 5; break;
        case 'm6': semitone = 8, degrees = 6; break;
        case 'M6': semitone = 9, degrees = 6; break;
        case 'm7': semitone = 10, degrees = 7; break;
        case 'M7': semitone = 11, degrees = 7; break;
        case 'P8': semitone = 12, degrees = 8; break;
        default: return ("Error: interval not supported");                                                        
    }
    letter = note.slice(0,1);

    if(note.length < 1 || note.length > 3) return ("Error: cannot identify the interval");
    if(note[0] < 'A' || note[0] > 'G') return ("Error: cannot identify the interval");
    if(note[1] && note[1] != '#' && note[1] != 'b') return ("Error: cannot identify the interval");
    if(note[2] && note[2] != '#' && note[2] != 'b') return ("Error: cannot identify the interval");

    (ascending == 1) ? letterid = letnum(letter)+degrees-1 : letterid = letnum(letter)-degrees+1;
    oldletterid = letnum(letter);

    while((letterid > 7 && ascending == 1) || (letterid < 0 && ascending == 0))   {
        (ascending == 1) ? letterid -= 7 : letterid += 7; } 

    for (let char of note) 
    {
      if(char == '#')  
        (ascending == 1) ? count -= 1 : count += 1;
      else if(char == 'b')
        (ascending == 1) ? count += 1 : count -= 1;       
    }      

    while(true)     {
        count += distance(letnum(oldletterid),ascending);   
        (ascending == 1) ? oldletterid++ : oldletterid--;
        if(oldletterid > 6 && ascending == 1)    
            oldletterid = 0;    
        else if(oldletterid < 0 && ascending == 0)        
            oldletterid = 6;     
        if(oldletterid == letterid)     
            break;       }
    if(semitone == count) 
        return (letnum(letterid));
    else if(count-semitone == 1) 
        if(ascending == 1) return(letnum(letterid)+"b");
        else return(letnum(letterid)+"#");
    else if(count-semitone == 2) 
        if(ascending == 1) return(letnum(letterid)+"bb") 
        else return(letnum(letterid)+"##") ;      
    else if(semitone-count == 1) 
        if(ascending == 1) return(letnum(letterid)+"#") 
        else return(letnum(letterid)+"b") ;     
    else if(semitone-count == 2) 
        if(ascending == 1) return(letnum(letterid)+"##") 
        else return(letnum(letterid)+"bb") ;
}


function letnum(let)        
{
  let arr = ['A','B','C','D','E','F','G'];
  if(isFinite(let)) // let is number
    return arr[let];
  else  //if 'let' is string
    return arr.indexOf(let);
}


function distance(a,ascending=1)
{
    switch(a)
    {
        case 'A': return 2; break;
        case 'B': 
        {
            if(ascending == 1) return 1;
            else return 2;
            break;
        }  
        case 'C': 
        {
            if(ascending == 1) return 2;
            else return 1;
            break;
        }                
        case 'D': return 2; break;
        case 'E': 
        {
            if(ascending == 1) return 1;
            else return 2;
            break;
        } 
        case 'F': 
        {
            if(ascending == 1) return 2;
            else return 1;
            break;
        }          
        case 'G': return 2; break;   
    }
}

function intervalIdentification(arr) 
{
    let intervala = arr[0],
    intervalb = arr[1],
    ascending = arr[2],
    degrees = 0,
    lettera,
    letterb,
    letteraid = 0,
    letterbid = 0,    
    count = 0;
    (ascending = '' || !ascending || ascending == 'asc') ? ascending = 1 : ascending = 0;    
    if(intervala.length < 1 || intervala.length > 3 || intervalb.length < 1 || intervalb.length > 3) return ("Error: cannot identify the interval");
    if(intervala[0] < 'A' || intervala[0] > 'G' || intervalb[0] < 'A' || intervalb[0] > 'G') return ("Error: cannot identify the interval");
    if((intervala[1] && intervala[1] != '#' && intervala[1] != 'b') || (intervala[2] && intervala[2] != '#' && intervala[2] != 'b')) return ("Error: cannot identify the interval");    
    if((intervalb[1] && intervalb[1] != '#' && intervalb[1] != 'b') || (intervalb[2] && intervalb[2] != '#' && intervalb[2] != 'b')) return ("Error: cannot identify the interval");        

    lettera = intervala.slice(0,1);
    letterb = intervalb.slice(0,1); 
    (ascending == 1) ? letteraid = letnum(lettera) : letteraid = letnum(lettera);    
    (ascending == 1) ? letterbid = letnum(letterb) : letterbid = letnum(letterb);            
   
    if(ascending == 1) degrees = letterbid-letteraid+1;
    else degrees = letteraid-letterbid+1;
    if(degrees <= 0) degrees += 7;
    for (let char of intervala) 
    {
      if(char == '#')  
        (ascending == 1) ? count -= 1 : count += 1;
      else if(char == 'b')
        (ascending == 1) ? count += 1 : count -= 1;       
    }      
    for (let char of intervalb) 
    {
      if(char == '#')  
        (ascending == 1) ? count += 1 : count -= 1;
      else if(char == 'b')
        (ascending == 1) ? count -= 1 : count += 1;       
    }     
    
    while(true)     
    {
        count += distance(letnum(letteraid),ascending);   
        (ascending == 1) ? letteraid++ : letteraid--;
        if(letteraid > 6 && ascending == 1)    
            letteraid = 0;    
        else if(letteraid < 0 && ascending == 0)        
            letteraid = 6;     
        if(letteraid == letterbid)     
            break;       
    }
    return takeintervalname(degrees,count);
}

function takeintervalname(degrees,semitone)
{
    switch(degrees)
    {
        case 2:
        {
            if(semitone == 1)
                return 'm2';
            else if(semitone == 2)
                return 'M2';
        }
        case 3:  
        {
            if(semitone == 3)
                return 'm3';
            else if(semitone == 4)
                return 'M3';
        }      
        case 4:  
        {
            if(semitone == 5)
                return 'P4';
        }     
        case 5:  
        {
            if(semitone == 7)
                return 'P5';
        }  
        case 6:  
        {
            if(semitone == 8)
                return 'm6';
            else if(semitone == 9)
                return 'M6';
        }    
        case 7:  
        {
            if(semitone == 10)
                return 'm7';
            else if(semitone == 11)
                return 'M7';
        }         
        case 8:  
        {
            if(semitone == 12)
                return 'P8';
        } 
        default: return("Cannot identify the interval");              
    }                                               
}


// let test1 = ['M2', 'C', 'asc'];//	D
// let test2 = ['P5', 'B', 'asc'];//	F#
// let test3 = ['m2', 'Bb', 'dsc'];//	A
// let test4 = ['M3', 'Cb', 'dsc'];//	Abb
// let test5 = ['P4', 'G#', 'dsc'];//	D#
// let test6 = ['m3', 'B', 'dsc'];//	G#
// let test7 = ['m2', 'Fb', 'asc'];//	Gbb
// let test8 = ['M2', 'E#', 'dsc'];//	D#
// let test9 = ['P4', 'E', 'dsc'];//	B
// let test10 = ['m2', 'D#', 'asc'];//	E
// let test11 = ['M7', 'G', 'asc'];//	F#

// let test12 = ['C', 'D'];// M2
// let test13 = ['B', 'F#', 'asc'];// 	P5
// let test14 = ['Fb', 'Gbb'];// 	m2
// let test15 = ['G', 'F#', 'asc'];// 	M7
// let test16 = ['Bb', 'A', 'dsc'];// 	m2
// let test17 = ['Cb', 'Abb', 'dsc'];// 	M3
// let test18 = ['G#', 'D#', 'dsc'];// 	P4
// let test19 = ['E', 'B', 'dsc'];// 	P4
// let test20 = ['E#', 'D#', 'dsc'];// 	M2
// let test21 = ['B', 'G#', 'dsc'];// 	m3

// console.log(intervalConstruction(test1)); 
// console.log(intervalConstruction(test2)); 
// console.log(intervalConstruction(test3)); 
// console.log(intervalConstruction(test4)); 
// console.log(intervalConstruction(test5)); 
// console.log(intervalConstruction(test6)); 
// console.log(intervalConstruction(test7)); 
// console.log(intervalConstruction(test8)); 
// console.log(intervalConstruction(test9)); 
// console.log(intervalConstruction(test10)); 
// console.log(intervalConstruction(test11)); 
// console.log(intervalIdentification(test12));
// console.log(intervalIdentification(test13));
// console.log(intervalIdentification(test14));
// console.log(intervalIdentification(test15));
// console.log(intervalIdentification(test16));
// console.log(intervalIdentification(test17));
// console.log(intervalIdentification(test18));
// console.log(intervalIdentification(test19));
// console.log(intervalIdentification(test20));
// console.log(intervalIdentification(test21));
