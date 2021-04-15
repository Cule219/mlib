import sys

numbers = [54, 26, 43, 17, 7, 76, 23, 67, 98, 14]

def quicksort(values):
    if len(values) <= 1:
        return values
    less_than_pivot = []
    greater_then_pivot = []
    pivot = values[0]
    for value in values[1:]:
        if value <= pivot:
            less_than_pivot.append(value)
        else:
            greater_then_pivot.append(value)
    return quicksort(less_than_pivot) + [pivot] + quicksort(greater_then_pivot )

sorted_numbers = quicksort(numbers)
print(sorted_numbers)