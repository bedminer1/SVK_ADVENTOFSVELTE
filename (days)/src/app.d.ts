// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Child {
    name: string
    tally: number
}

interface NamesList {
	firstNames: string[]
	lastNames: string[]
}

interface Present {
	name: string
	weight: number
	added: boolean
}

interface PresentGroup {
	presents: Present[]
	weight: number
}

interface Question {
    question: string;
    answers: {
        text: string;
        correct: boolean;
    }[]
}

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	size: number
}

interface AmazonPresent {
	name: string
	x: number
	y: number
}

interface Present3D {
	name: string
	x: number
	y: number
	z: number
}

interface Expense {
	gift: string
	amount: number
}

type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

interface Task {
	elf: string
	task: TaskType
	minutesTaken: number
	date: string;
}

interface dataSet {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderWidth: number;
        backgroundColor: string;
    }[];
}

interface LineDataSet {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderWidth: number;
		borderColor: string;
        backgroundColor: string;
    }[];
}

interface text {
	body: string,
	time: Date,
	author: string,        
}

interface ElfPost {
	id: string 
	author: string 
	timestamp: string
	content: string
	likes: number 
	comments: Comment[] 
}

interface Comment {
	id: string
	author: string 
	timestamp: string 
	content: string 
	likes: number 
}

interface WaterInput {
	timestamp: string
	amount: number
}
