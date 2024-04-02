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
