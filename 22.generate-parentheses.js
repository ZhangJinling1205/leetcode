/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
// 回溯又是我的知识盲区了
var generateParenthesis1 = function (n) {
  // 思路: 2*n 是括号总数, 对括号进行排列组合, 再除去不合题意的部分
  let arr = new Array();
  let level = 0, // 实时记录字符串的长度
    sum = 2 * n, // 括号总数
    str = '', // 括号累加的字符串
    left = 0, // 记录左括号数目
    right = 0; // 记录右括号数目
  // recur1(level, sum, str, arr);
  recur2(sum, str, arr, left, right);
  // console.log('arr: ', arr);
  return arr;
};

// solution 1: 暴力法
var recur1 = (level, sum, str, arr) => {
  if (level == sum && str.length == sum) {
    // 将合法的组合放进结果数组
    if (isValid(str)) {
      arr.push(str);
    }
    return;
  }
  // 通过递归生成所有的可能的组合
  recur(level + 1, sum, str + '(', arr);
  recur(level + 1, sum, str + ')', arr);
}

var isValid = function (s) {
  while (s.indexOf('()') >= 0 || s.indexOf('{}') >= 0 || s.indexOf('[]') >= 0) {
    s = s.replace(/\(\)/g, '')
    s = s.replace(/\[\]/g, '')
    s = s.replace(/\{\}/g, '')
  }
  return s == '';
};

// 可以进行优化
/**
 * 这四个条件确保放进结果数组里的字符串一定都是合法的
 * (感觉需要证明下)
 * 1. 左右括号一一对应
 * 2. 左右括号分别均为 n 个
 * 3. 当左括号数量大于右括号时，才加右括号
 * 4. 开头第一个一定是左括号
 *
 */
var recur2 = (sum, str, arr, left, right) => {
  if (str.length == sum && left == right) {
    // 将合法的组合放进结果数组
    arr.push(str);
    return;
  }
  // 通过递归生成所有的可能的组合
  // 添加左括号, left + 1
  // 添加右括号, right + 1
  // 左括号的数量少于一半, 则加左括号
  if (left <= parseInt(sum / 2)) {
    recur2(sum, str + '(', arr, left + 1, right);
  }
  // 左括号数量大于右括号时, 才加右括号
  if (left > right) {
    recur2(sum, str + ')', arr, left, right + 1);
  }
}

// 2020/10/21 学习回溯模板之后
var generateParenthesis = (n) => {
  let path = [], res = [];
  helper(path, res, n, n, n);
  return res;
}

var helper = (path, res, n, left, right) => {
  // 左括号剩的比右括号多 不合法
  if (left > right) return;
  // 使用次数小于0 不合法
  if (left < 0 || right < 0) return;
  // 左右括号都恰好用完, 得到一个合法的括号
  if (left == 0 && right == 0) {
    res.push(path.join(''));
    return;
  }
  // 尝试放一个左括号
  path.push('('); // 选择
  helper(path, res, n, left - 1, right);
  path.pop(); // 撤销选择
  // 尝试放一个右括号
  path.push(')'); // 选择
  helper(path, res, n, left, right - 1);
  path.pop(); // 撤销选择
}

generateParenthesis(3);
// @lc code=end

