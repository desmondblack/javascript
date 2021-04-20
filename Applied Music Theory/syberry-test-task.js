
let test1 = ['M2', 'C', 'asc'];
let test2 = ['P5', 'B', 'asc'];	
//intervalConstruction(test1);
//intervalConstruction(test2);
let tes1 = ['C', 'D'];//	M2
let tes2 = ['B', 'F#', 'asc'];//	P5
//intervalIdentification(tes1);
//intervalIdentification(tes2);
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

        if(note[1] == '#') 
            (ascending == 1) ? count -= 1 : count += 1;
        if(note[1] == 'b') 
            (ascending == 1) ? count += 1 : count -= 1;       

    while(true)     {
        count += distance(takelet(oldletterid),ascending);   
        (ascending == 1) ? oldletterid++ : oldletterid--;
        if(oldletterid > 6 && ascending == 1)    
            oldletterid = 0;    
        else if(oldletterid < 0 && ascending == 0)        
            oldletterid = 6;     
        if(oldletterid == letterid)     
            break;       }
    if(semitone == count) 
        return (takelet(letterid));
    else if(count-semitone == 1) 
        if(ascending == 1) return(takelet(letterid)+"b");
        else return(takelet(letterid)+"#");
    else if(count-semitone == 2) 
        if(ascending == 1) return(takelet(letterid)+"bb") 
        else return(takelet(letterid)+"##") ;      
    else if(semitone-count == 1) 
        if(ascending == 1) return(takelet(letterid)+"#") 
        else return(takelet(letterid)+"b") ;     
    else if(semitone-count == 2) 
        if(ascending == 1) return(takelet(letterid)+"##") 
        else return(takelet(letterid)+"bb") ;
}


function letnum(let)        
{
    switch(let)
    {
        case 'A': return 0; break;
        case 'B': return 1; break;
        case 'C': return 2; break;
        case 'D': return 3; break;
        case 'E': return 4; break;
        case 'F': return 5; break;    
        case 'G': return 6; break;    
    }
}
function takelet(let)
{
    switch(let)
    {
        case 0: return 'A'; break;
        case 1: return 'B'; break;
        case 2: return 'C'; break;
        case 3: return 'D'; break;
        case 4: return 'E'; break;
        case 5: return 'F'; break;    
        case 6: return 'G'; break;    
    }
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
    if(intervala[1] == '#') 
        (ascending == 1) ? count -= 1 : count += 1;
    if(intervala[1] == 'b') 
        (ascending == 1) ? count += 1 : count -= 1;     
    if(intervala[2] == '#') 
        (ascending == 1) ? count -= 1 : count += 1;
    if(intervala[2] == 'b') 
        (ascending == 1) ? count += 1 : count -= 1;   
    if(intervalb[1] == '#') 
        (ascending == 1) ? count += 1 : count -= 1;
    if(intervalb[1] == 'b') 
        (ascending == 1) ? count -= 1 : count += 1;     
    if(intervalb[2] == '#') 
        (ascending == 1) ? count += 1 : count -= 1;
    if(intervalb[2] == 'b') 
        (ascending == 1) ? count -= 1 : count += 1;     

    while(true)     
    {
        count += distance(takelet(letteraid),ascending);   
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

