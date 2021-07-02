const DB = require('../classes/Db');
const Query = require('../classes/Query');
const treeBranchParsing = require('../helpers/treeBranchParsing');

const config = require('../config');
const db = new DB(config.db);

const query = new Query(config.tables.tree);
const query_b = new Query (config.tables.branch);

class branchParsing {

   async branchPars(parsedBody){
       const id = await db.selectQuery(query.SelectIdByName(JSON.parse(parsedBody).name));
       //убираем поле id из дерева и оставляем только value и child
       let newString = JSON.parse(parsedBody, (key, val) => typeof val !== "number" ? val : undefined);

       //рекурсивно проходим по всему дереву. в буфер временно записываем все значения встречающихся по путям ключей.
       //каунт считает степень вложенности дерева
       let buffer = [], count = 0, res = "";
       function js_traverse(o) {
           let type = typeof o; count++;
           if (type == "object") {
               for (let key in o) {
                   js_traverse(o[key])
               }
           } else {
               //если на данном этапе вложенности у нас уже записана какая то ветка, то её
               //сохраняем в строку, отрезаем сохраненные излишки буфера
               //и сохраняем новое еще не сохраненное значение
               if (buffer[count/2 - 1] != null){
                   buffer.splice(count/2 - 1, buffer.length - (count/2 - 1));
                   buffer.push(o);
               }
               else buffer.push(o);
               res += buffer + "; ";
           }
           count--;
       }
       js_traverse(newString.root);

       //в массив keys записывается все полученные ветки из строки res. ветки были разграничены знаком ;
       //данный массивы выходит одномерным и в нём не удобно отсекать лишние ветки, поэтому
       //создаем двумерный массив, в котором строки - это ветки, а столбцы это уровень вложенности ветки
       let keys = [], roots = [], array = []; count = 0;
       keys = res.split("; "); keys.length = keys.length - 1;
       keys.forEach(item => {
           array[count] = keys[count].split(",");
           roots[count] = keys[count].split(","); count++;
       })

       //отсекаем все лишние ветки и оставляем только конечные, например
       //'main name,second name1,third name3',
       //'main name,second name1,third name3,fourth name1',
       //'main name,second name1,third name3,fourth name1,fifth name1',
       // алгоритм сделан так, что он 1й строкой записывает корень, 2й строкой корень+1путь до конечной ветки, 3й строкой корень+1путь+2путь и т.д.
       // поэтому среди этих 3х веток последняя является конечной, а первые 2 избыток рекурсивного алгоритма и не нужны для конечной работы
       // для того что бы убрать все лишнии ветки мы просто убираем все строки, которые короче следующей строки
       //
       for (count = 1; count < roots.length; count++ ){
           buffer = roots[count-1];
           if (roots[count].length > buffer.length){
               roots[count-1] = "";
           }
       }
       roots = roots.filter(item => item !== "");keys = [];

       //возвращаем списко веток из двумерного массива обратно в одномерный для удобства вставки в БД
       for (let i = 0; i < roots.length; i++){
           res = "";
           for (let j = 0; j < roots[i].length; j++){
               res += (roots[i][j]) + " ";
           }
           keys.push(res);
       }

       buffer = [];res = "";js_traverse(id); res = res.substring(0, res.length-2);
       let to_ins = keys.map(item => `('${res}', '${item}')`);let ins_branch = "";
       for(let i = 0; i < 1;i++){
          ins_branch += to_ins ;
       }
       await db.insert(query_b.InsertBranch(ins_branch));
   }

}
module.exports = branchParsing;