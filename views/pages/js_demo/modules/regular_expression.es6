/**
 * Created by monty on 2017/5/21.
 */

// ignoreCase：返回一个布尔值，表示是否设置了i修饰符，该属性只读
// global：返回一个布尔值，表示是否设置了g修饰符，该属性只读。
// multiline：返回一个布尔值，表示是否设置了m修饰符，该属性只读。
{

    let regex = /xyz/g;
    let regex2 = /n..a/g;
    let regex3 = /^n..a/g;
    let str = 'nihao xyzxyza';

    console.log(regex.exec(str));
    console.log(str.match(regex), 'ff');
    console.log(str.match(regex2), 'ff2');
    console.log(str.match(regex3), 'ff3');
    console.log(str.search(regex), 'qq');
    console.log(str.split(regex), 'ee');
    console.log(str.replace(regex, 'haha'), 'ww');
}
{
    let regex = /[0-9]+/g;
    let str = '3 and 8';

    console.log(str.replace(regex, '$2 $1'));
    console.log(str.replace(regex, (match) => {
        console.log(match);
        return 2 * match;
    }));
}