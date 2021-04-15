import sys
sys.path.insert(0, '/home/i/Desktop/code/mlib/datastructures/linkedlist')
# pylint: disable=wrong-import-position
from linked_list import LinkedList

def merge_sort(linked_list):
    """
    Sorts a linked list in ascending order
    - Recursively divide the linked list into the sublists containing a single node
    - Repetedly merge the sublist to produce sorted sublist until one remains

    Returns sorted linked list
    """
    if linked_list.size() == 1:
        return linked_list
    elif linked_list.head is None:
        return linked_list

    left_half, right_half = split(linked_list)
    left = merge_sort(left_half)
    right = merge_sort(right_half)
    return merge(left, right)

def split(linked_list):
    """
    Divide the unsorted list at midpoint into sublists
    """

    if linked_list == None or linked_list.head == None:
        left_half = linked_list
        right_half = None

        return left_half, right_half
    else:
        size = linked_list.size()
        mid = size // 2

        mid_node = linked_list.node_at_index(mid - 1)
        left_half = linked_list
        right_half = LinkedList()
        right_half.head = mid_node.next_node
        mid_node.next_node = None
        return left_half, right_half

def merge(left, right):
    """
    Merges two linked lists, sorting by data in the nodes
    Returns a new, merged list
    """

    merged = LinkedList()
    
    # Add a fake head that is discarded later
    merged.add(0)

    # Set current to the head of the linked list
    current = merged.head

    # Obtain head nodes for left and right linked lists
    left_head = left.head
    right_head = right.head

    # Iterate over left and right until we reach the tail node of either
    while left_head or right_head:
        # If the head node of left or right is None, we're past the tail
        if left_head == None:
            current.next_node = right_head
            right_head = right_head.next_node
        elif right_head == None:
            current.next_node = left_head
            left_head = left_head.next_node
        # compare values at left and right head and assign them in ascending order
        
        else:
            if left_head.data < right_head.data:
                current.next_node = left_head
                left_head = left_head.next_node
            else:
                current.next_node = right_head
                right_head = right_head.next_node
        # Move the current to the next node
        current = current.next_node

    # Discard the fake head
    merged.head = merged.head.next_node

    return merged

l = LinkedList()
l.add(5)
l.add(2)
l.add(4)
l.add(8)
l.add(9)

sorted_linked_list = merge_sort(l)
