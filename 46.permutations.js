/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * 
 * 算法思路是: 用一个数组维护每个数组元素的状态, true/false, 状态变量
 * 每次将未被放入的元素放入,每次放入一个元素后就再次dfs,再将没有放入的元素放入
 */
var permute = function (nums) {
  let len = nums.length;
  let resArr = new Array(); // 结果数组
  let path = new Array();
  let used = new Array();
  // 初始化状态变量
  for (let i = 0; i < len; i++) {
    used.push(false);
  }
  dfs(resArr, nums, len, path, 0, used);
  return resArr;
};

var dfs = (resArr, nums, len, path, depth, used) => {
  if (depth === len) {
    // 注意不能resArr.push(path) 后面path改变会影响res里的值
    // js 值传递 传的是变量的地址
    resArr.push(path.slice()); // 需要将path的深拷贝放入
    return;
  }
  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      path.push(nums[i]);
      used[i] = true;
      dfs(resArr, nums, len, path, depth + 1, used);
      used[i] = false; // 由于重新开始放入元素, 将已经放入的元素的状态置false
      path.pop(); // 弹出最后一个元素 路径回到上一个状态
    }
  }
}

let test = [1, 2, 3]
permute(test);
// @lc code=end
