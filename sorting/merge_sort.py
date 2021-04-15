# def merge_sort(list):
#     """
#     Sort a list in ascending order
#     Returns a new sorted list(does not mutate)

#     Divide: Find the midpoint of the list and divide into sublists
#     Conquer: Recursively sort the sublists created in previous step
#     Combine: Merge the sorted sublists creted in the previous step

#     Takes O(kn log n) time
#     """
#     if len(list) <= 1:
#         return list
#     left_half, right_half = split(list)
#     left = merge_sort(left_half)
#     right = merge_sort(right_half)

#     return merge(left, right)

# Merge sort recursion
def merge_sort(values):
    if len(values) <= 1:
        return values
    mid_index = len(values) // 2
    left_half = merge_sort(values[:mid_index])
    right_half = merge_sort(values[mid_index:])
    sorted_values = []
    left_index = 0
    right_index = 0
    while left_index < len(left_half) and right_index < len(right_half):
        if left_half[left_index] < right_half[right_index]:
            sorted_values.append(left_half[left_index])
            left_index += 1
        else:
            sorted_values.append(right_half[right_index])
            right_index += 1
    sorted_values += left_half[left_index:]
    sorted_values += right_half[right_index:]
    return sorted_values


def split(list):
    """
    Divide the unsorted list at midpoint into sulists
    Return the sublists - left and right
    """

    mid = len(list)//2
    left = list[:mid]
    right = list[mid:]

    return left, right


def merge(left, right):
    """
    Merges two lists(arrays), sorting them in the process
    Returns a new merged list
    """
    l = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            l.append(left[i])
            i += 1
        else:
            l.append(right[j])
            j += 1

    while i < len(left):
        l.append(left[i])
        i += 1
    while j < len(right):
        l.append(right[j])
        j += 1
    return l


def verify_sorted(list):
    n = len(list)

    if n == 0 or n == 1:
        return True

    return list[0] < list[1] and verify_sorted(list[1:])


alist = [54, 26, 43, 17, 7, 76, 23]

l = merge_sort(alist)
# print(verify_sorted(l))
print(l)
