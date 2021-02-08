/**
 * 根据前序遍历和中序遍历 生成二叉树
 */

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function builder(preOrder, inOrder) {
  const map = {};
  inOrder.forEach((item, index) => {
    map[item] = index;
  });

  return buildTree(preOrder, 0, preOrder.length - 1, inOrder, 0, inOrder.length - 1, map);
}


/**
 * 递归方法
 * @param {array} preOrder 前序数组
 * @param {number} preStart 前序数组当前递归层级的左边界索引
 * @param {number} preEnd 前序数组当前递归层级的右边界索引
 * @param {array} inOrder 中序数组
 * @param {number} inStart 中序数组当前递归层级的左边界索引
 * @param {number} inEnd 中序数组当前递归层级的右边界索引
 * @param {object} inMap 中序遍历value -> index映射表
 */
function buildTree(preOrder, preStart, preEnd, inOrder, inStart, inEnd, inMap) {
  if (preStart > preEnd || inStart > inEnd) return null;
  const root = new TreeNode(preOrder[preStart]);

  const pIndex = inMap[preOrder[preStart]];
  root.left = buildTree(preOrder, preStart + 1, pIndex + preStart - inStart, inOrder, inStart, pIndex - 1);
  root.right = buildTree(preOrder, pIndex + preStart - inStart + 1, preEnd, inOrder, pIndex + 1, inEnd, inMap);

  return root;
}
