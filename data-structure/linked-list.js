class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  unshift(val) {
    if (this.head === null) {
      this.head = new Node(val);
    } else {
      const node = new Node(val);
      node.next = this.head;
      this.head = node;
    }
  }

  pop(val) {
    if (this.head === null) {
      this.head = new Node(val);
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      const node = new Node(val);
      currentNode.next = node;
    }
  }

  print() {
    if (this.head === null) console.log("empty");
    else {
      console.log("value are:- ");
      let node = this.head;
      do {
        console.log(node.value, " ");
        node = node.next;
      } while (node !== null);
    }
  }
}

const sll = new SinglyLinkedList();
sll.unshift(1); // 1
sll.unshift(2); // 2,1
sll.print();
sll.pop(0); // 2,1,0
sll.print()

/**
 * l1, l2 p-2
 * l1 = 1,2,3,4
 * l2 = 7,8,9
 * o = 1,2,9,8,7,3,4
 * 
 * l2R = 9,8,7
 * 0 = 1,2,9,8,7,3,4
 */
