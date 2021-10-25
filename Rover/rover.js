function calculateRoverPath(map)
{
    let m = map.length-1;
    let error = 0;
    let fs = require('fs');
    let n = 0;
    let start = '0,0';
    let graph = {};
    let goal = 0;    
    if(!map.length || !Array.isArray(map)) return fs.writeFileSync('path-plan.txt','Cannot start a movement, because map not found!');    
    for(let i = 0; i < map.length; i++) {
        if(map[i].length > n) 
            n = map[i].length-1;
    }
    goal = (m)+','+(n); 
    map.forEach((el,y) =>   {   
        el.forEach((el2,x) =>   { 
            if(!Math.abs(el2) && el2 != 'X' && Number(el2) != 0) error = 1;
            let index;
            index = [y,x].join(",");
            graph[index] = [];                     
            for(let i = -1; i<=1; i++)  {
                for( let j = -1; j <= 1; j++) {
                    if( (j != 0 || i != 0) && map[y+i])
                    {                   
                        if(Math.abs(i) != Math.abs(j))  { 
                            const cost = Math.max(map[y+i][x+j],el2)-Math.min(map[y+i][x+j],el2)+(+1);
                            if(cost)    {
                                    graph[index].push([cost,[y+i,x+j].join(',')] );
                            }    
                        }
                        else    {
                            const cost = Math.max(map[y+i][x+j],el2)-Math.min(map[y+i][x+j],el2)+(+1.5);
                            if(cost)    {
                                graph[index].push([cost,[y+i,x+j].join(',')] ); 
                            }
                        }
                    }
                }
            }             
        })
    })
    if(error == 1) return fs.writeFileSync('path-plan.txt','Cannot start a movement, because map include wrong data!');
    if(start == goal) return fs.writeFileSync('path-plan.txt','Cannot start a movement, because rover at the place now!');
    let visited = findway(start,goal,graph);
    if(visited)    {
        let steps = 0;
        let current = goal;
        let points = [goal];
        while(current != start)        {
            current = visited[current]
            points.push(current);
            steps += 1;
        }
        let str = ('['+points.reverse().join(']->[')+']').replace(/,/g,'][');
        str += '\nsteps: '+steps+'\nfuel: '+Math.floor(fuel);
        fs.writeFileSync('path-plan.txt',str);
    }   else    {
        fs.writeFileSync('path-plan.txt','Cannot start a movement, because rover can not find the way!');
    }
    return findway(start,goal,graph)
}    
function findway(start,goal,graph) {
    let processed = [];
    let prices = {[start] : 0};
    let parents = {};
    let minway = findlowestprice(prices,processed);
    let price = 0;
    let newprice = 0;
    let neighbors = [];
    let isFinded = false;
    let fuel = 0;
    parents = graph[start].reduce( function(key, [c,n])     {
        return {...key, ...{[n] : start}};
    }
    ,{} ); 
    while(minway)    {
        neighbors = graph[minway];
        price = prices[minway];
        neighbors.forEach((n) =>    {
            let [oldprice, oldminway] = n;
            if(typeof prices[oldminway] == 'undefined') {
                prices[oldminway] = Infinity;
            }
            newprice = price + oldprice;
            if(prices[oldminway] > newprice)    {
                prices[oldminway] = newprice;
                parents[oldminway] = minway;
            }
        })         
        if(minway == goal)    {
            isFinded = true;
            break;
        }
        processed.push(minway);
        minway = findlowestprice(prices,processed);        
    }
    return isFinded ? parents : null;
}

function findlowestprice(prices,processed)  {
        let lowestprice = Infinity;
        let lowestpriceway = null;
        Object.keys(prices).forEach((key) =>        {            
            if(prices[key] < lowestprice && !processed.includes(key))             {
                lowestprice = prices[key];
                fuel = lowestprice;
                lowestpriceway = key;  
            }
        });
        return lowestpriceway;
}

module.exports = {
    calculateRoverPath,
};
