### **Задача**
Вы — инженер, проектирующий роверы-беспилотники. Вам надо спроектировать путь ровера по заранее известной местности с максимальной экономией заряда.

**Местность**
<br/>Вам пришли данные о местности в закодированном виде: фотография, сконвертированная в матрицу с числами. Одна матрица — это прямоугольный снимок размером х на y метров. Вот пример одной такой сконвертированной фотографии, на ней снимок в 100 на 100 метров:
<br/><br/>0 2 3 4 1
<br/>2 3 4 4 1
<br/>3 4 5 6 2
<br/>4 5 6 7 1
<br/>6 7 8 7 1
<br/><br/>Числа показывают высоту над уровнем моря. 0 — это высота ровно на уровне моря, а, например, 4 — это 4 единицы над уровнем моря. На Фото 1 закодирован холм, пологий слева и резко обрывающийся справа.
Небольшой холмик выглядел бы вот так:
<br/><br/>0 1 1 1 0
<br/>1 1 3 1 1
<br/>0 1 1 1 0
<br/>0 0 0 0 0
<br/><br/>А вот так: ложбина между двумя холмами
<br/><br/>1 1 2 3 4
<br/>1 0 1 2 3
<br/>2 1 1 1 2
<br/>3 3 1 0 1
<br/>4 3 1 1 0
<br/><br/>На этих данных - скала или овраг, так как виден очень резкий перепад высот в середине снимка:
<br/><br/>1 1 6 7 7
<br/>1 1 6 7 8
<br/>1 6 7 8 9
<br/><br/>А на этом - маленькая ямка:
<br/><br/>3 4 4 4 4 3
<br/>3 2 1 1 1 4
<br/>4 2 1 1 3 4
<br/>4 4 2 2 3 4
<br/><br/>Данные придут вам в виде матрицы с неотрицательными числами. Размер матрицы NxM.
**Ровер**
<br/> Ровер всегда движется из верхней левой точки [0][0] в правую нижнюю точку [N - 1][M - 1], где N и M - это длина и ширина матрицы. Это надо для того, чтобы разрезать фотографию на одинаковые куски, обработать их по-отдельности, а потом склеить весь путь.

### **Ограничения:**
<br/>**Движение**
<br/>Из любой точки ровер может двигаться только в четыре стороны: на север, юг, запад, восток. Ровер не может ехать по-диагонали — эта функция еще не реализована. Ровер не может вернуться в ту точку, в которой уже был.
<br/><br/>**Заряд**
<br/>Ровер ездит на заряде. Вы знаете, что для ровера очень затратно подниматься и опускаться. Он тратит единицу заряда на само движение, и дополнительные единицы на подъем и спуск. Ровер бы вообще спокойно жил, если бы ездил по асфальту в Беларуси, тогда бы он тратил себе линейно заряд и в ус не дул, но жизнь его сложилась иначе.
<br/><br/>**Расход заряда**
<br/>Заряд расходуется по правилу:
На 1 шаг ровер всегда тратит 1 единицу заряда. На подъем или спуск ровер тратит заряд, пропорциональный сложности подъема или спуска. Сложность подъема или спуска - это разница между высотами. 
<br/>*Например, в такой местности:*
<br/>1 2
<br/>1 5
на путь из [0][0] в [0][1] ровер потратит 2 единицы заряд: 1 единица заряда на само движение, и еще 1 единицу заряда на подъем в [0][1]. А из [0][1] в [1][1] ровер потратит 4 единицы заряда: 1 единица на само движение, и 3 единицы (5 - 2) на подъем
Необходимо рассчитать путь ровера из верхей левой [0][0] точки в правую нижнюю [N - 1][M - 1] точку с минимальной тратой заряда.
Вы заранее не знаете размер фотографии, которую будете обрабатывать, N и M - произвольные неотрицательные числа.
План пути и планируемый расход отражается в txt файле.
 <br/>Для местности:
<br/><br/>0 4
<br/>1 3
<br/>
<br/>план будет такой:
<br/><br/>*path-plan.txt
<br/>[0][0]->[1][0]->[1][1]
<br/>steps: 2
<br/>fuel: 5*
<br/><br/> Ровер едет из 0 в 1 в 3, сделает два шага, потратит 5 заряда. Если бы он поехал сначала в 4, потом в 3, он бы сделал то же количество шагов, но потратил бы 7 заряда. Оптимальный путь: 2 шага и 5 заряда.

 В моём коде данные подаются в виде массива, например:
<br/>[
<br/>[1,2,3,4],
<br/>[1,5,6,7],
<br/>[1,8,9,10],
<br/>[1,1,3,1],
<br/>]



Update. Rover 2.0
May 19 2021 Technical Interview

A word of advice
In Academy, we expect you to know how to read requirements and how to code in your language.
To prove this, we ask you to implement this task and submit it via Gitlab to confirm that you are ready to study at Academy.
This task requires approximately two working hours to solve. It does not mean that you will solve it in two hours. It is ok to spend up to four hours on this task.
We suggest you spend at least 40 minutes reading the task and modeling the solution. We tested this task on our engineers: several Syberry Junior Developers spent 40 minutes reading and thinking and approximately 1:30 hours of programming it on average.

Rover v02
Update your first version of Rover code.
Your task is to calculate the path with minimized fuel cost.
The first version is working, but real-life tests showed that it didn't match the reality.

What are the changes?

Below the sea level
The previous version processes only the terrain that is above sea level. But in reality, the landscape can be both above and below sea level. The new version of the code must handle different terrains.
The numbers still show the height. Zero 0 is a sea level. Positive numbers show the elevation above sea level. Negative numbers mean that the terrain is below sea level.
For example, here is already parsed photo of a small lake:
{{"0","-1","-1","-1","0"}, 
{"-1","-1","-3","-1","-1"}, 
{"0","-1","-1","-1","0"}, 
{"0","0","0","0","0"}} 

Impossible Elevation
Nature is unpredictable, and sometimes there are places that the Rover cannot reach. Such terrain is marked as X on the photo. Rover cannot go into that place.
For example, here is a unparsed photo with unreachable terrain:
1 1 X X X 
1 1 X X 8 
1 1 0 0 3 

Updated movement
Now your Rover can move diagonally! It still cannot get back to the same place, though.
Rover still moves from the [0][0] to [N - 1][M - 1]. N and M are arbitrary positive numbers.

Updated fuel mileage

Fuel Mileage with Negative Numbers
The fuel cost works the same with negative numbers: moving from 0 to 2 will cost the same two fuel units as moving from 0 to -2. Moving from 2 to -2 will cost the same as moving from 4 to 0.

Fuel Mileage with Diagonal Movement
Diagonal movement requires different fuel mileage. Every second diagonal move consumes two fuel units. The first diagonal move is one fuel, the second diagonal move is two fuel, the third is one fuel, the fourth is two, etc.
For example, here  
1 2 1 
1 2 1 
1 7 0 
a path from [0][0] to [1][1] costs 1 fuel for diagonal move plus 1 fuel for elevation, and a path from [1][1] to [2][2] costs 2 fuel for the second diagonal move and 2 fuel for descent.

Error handling

Data
Data is not ideal. Sometimes the parser that converts from the photo to numbers shows bizarre results. Please make sure that the matrix contains only numerals and the 'X' sign.

Exceptions
Something may go wrong. There may be no matrix at all, or the matrix may contain weird data, or the path may start with X at [0][0]. There are tons of ways that the program can go wrong.
Implement exception handling. The exception rules: if the Rover cannot start its movement, throw the CannotStartMovement exception. End the program and write the reason to path-plan.txt
So, if the Rover cannot move, throw an exception and end the program. Write to the path-plan.txt something like "Cannot start a movement because ...... ." Come up with your description of a problem. Write in clear and simple English.

String parsing
The input matrix now is a string array, not an integer array.
Input example:
Java and C#:
{{"1", "2"},{"1","X"},{"0","1"}}
JS:
[['1', '2'],['1','X'],['0','1']]

Requirements
Use the code from your test task. Update the calculateRoverPath(map) function.
DO NOT CHANGE THE CODE IN YOUR TEST TASK REPOSITORY.
The function must take a two-dimensional string array as input
The result of the program run is a path-plan.txt file stored in the same folder where the file with code is

JS
Do not use console.log or any other output methods 
Add module.exports at the end of your file
module.exports = {
    calculateRoverPath,
};
function calculateRoverPath(map)

Restrictions
Do not use libraries for algorithms. You must implement the algorithm using the basic instruments of your language. 
You may use these libraries for writing to file. Use the most straightforward ways possible.
JS: you must only use Node js for writing to file.

Code Style
You MAY follow the coding style guide for your language. 
C# Style Guide 
Java Style Guide 
JS Style Guide 
Do not use Russian language in your code or comments. Write only in English 

How to submit
Create your personal private repository in GitLab. Name it Name-Surname-Academy-Technical-Interview. It is important to have your repository PRIVATE. We won't check solutions in the public repository. 
The end time is the time of your last commit in your repository.
Submit a file named Rover.__and a blank README.md
A file MUST contain the function calculateRoverPath(map). You may add any other functionality to the file. 
We'll need read permission to your repository to check your solution. Add user SyberryAcademy to your repository as a Maintainer.
Send a link to your repository with the solved task to academy@syberry.com. Email subject: "Syberry Academy Technical Interview Name Surname". For example, "Syberry Academy Technical Interview Jane Doe".
We have an authomatic filter on our mailbox. If you won't write a subject as we asked, we won't see your task and disqualify your solution.

What's next
If you did well on our task, our Recruiter will call you and invite you to an HR interview. If not, we'll send you an email with your results and comments.
We will need five working days to process your results.

Sanity Check: Please Double Check these Requirements
The following requirements MUST be completed. If not, we won't check your task.

The Rover.__ file MUST in your Gitlab repository in the root folder (see example)
Do not use output methods
Do not use packages or namespace
The repository MUST be private
User SyberryAcademy MUST be added as a Maintainer
The email has a proper subject
The last commit is before Wednesday, 15:30 Minsk Time (GMT+3)
The email is sent before Wednesday, 15:30 Minsk Time (GMT+3)
Your main() function does not have test data (or any other data)
Your repository has the following structure:

Jane-Doe-Academy-Technical-Interview
    Rover.cs
    README.md
Keanu-Reeves-Technical-Interview
    Rover.java
    README.md
Henry-Cavill-Technical-Interview
    rover.js
    README.md
No Slacking Off!
