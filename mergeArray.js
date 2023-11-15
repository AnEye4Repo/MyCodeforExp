/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = m - 1; // Pointer for nums1
    let j = n - 1; // Pointer for nums2
    let k = m + n - 1; // Pointer for the merged array

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            console.log(`${nums1[i]} > ${nums2[j]}`);
            console.log("this is k before with i", k);
            console.log("this is i before ", i);
            console.log(nums1);
            nums1[k--] = nums1[i--];
            console.log(nums1);
            console.log("this is k after with i", k);
            console.log("this is i before ", i);

        } else {
            console.log(`${nums1[i]} < ${nums2[j]}`);
            console.log("this is k before with j", k);
            console.log("this is j before ", j);
            console.log(nums1);
            nums1[k--] = nums2[j--];
            console.log(nums1);
            console.log("this is k after with j", k);
            console.log("this is j after", j);
        }
    }

    // If there are remaining elements in nums2, copy them to the beginning of nums1
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
};

// Example usage:
const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

merge(nums1, m, nums2, n);
console.log(nums1); // Output: [1, 2, 2, 3, 5, 6]
