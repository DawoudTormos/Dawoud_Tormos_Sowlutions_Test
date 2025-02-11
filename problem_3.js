class Queue{

    constructor(){
        this.size = 0
        this.head = undefined
        this.tail = undefined
    }


     enqueue(fruitValue){// enqueue: add the queue at the tail

        let newNode = new FruitNode(fruitValue)

        if (this.is_empty()){// if empty the head and tail is the same as there is only one item now
            this.tail = newNode;
            this.head = newNode;
        }else{//if not empty, add to the tail and edit the refrences(.next) as needed 
            this.tail.next = newNode;//edit the refrences(.next) as needed
            this.tail = newNode;//new tail is the next of the older tail
        }
        this.size++//increment the size
    }

    dequeue() {

        if (this.is_empty()) {
            return null; 
        }
        
        const removedNode = this.head;
        this.head = this.head.next;//new head is the next of the old head 

        if (this.head === null) {//noting to dequeue if the queue is empty
            this.tail = null;
        }

        this.size--;//decrment the size
        return removedNode.value;
    }

    peek() {
        if (this.is_empty()) {//nothing to see
            return null;
        }
        return this.head.value;//see the head of the queue
    }

    is_empty() {
        return this.size === 0;
    }




    get_size() {
        return this.size;//get the size of the queue
    }

    print() {//print the queue similarly to the example in the probkem in the test
        let current = this.head;
        const elements = [];
        while (current) {// while current is not null, push to the array and get the next current
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements.join(', '));
    }

}



class FruitNode{
    constructor(fruitValue){
        this.value = fruitValue
        this.next = undefined
    }
}




//Example_Usage:
let my_queue = new Queue()

my_queue.enqueue("apple")
my_queue.enqueue("banana")
my_queue.enqueue("cherry")

//check if empty
let is_empty = my_queue.is_empty()
console.log("queueIsEmpty: ", is_empty)

//see the ead of the queue
let front_item = my_queue.peek()
console.log("Head: ", front_item)

//dequeueing from the queue
let dequeued_item = my_queue.dequeue()
console.log("dequeued fruit: ", dequeued_item)

//see the size of the queue
let size = my_queue.get_size()


//print the fruits in the queue 
my_queue.print()
