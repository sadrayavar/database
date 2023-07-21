export default class Database {
	databaseName = ""
	#tableNames = []
	#debug = 0

	constructor(name, type, debug = 0) {
		// initialize debug condition
		this.#debug = debug

		this.databaseName = name

		if (type === true) {
			// fetch data from localStorage
			this.#tableNames = Object.keys(this.#loadData())
		}
		// if the type is object
		else if (typeof type === "object" && !Array.isArray(type) && type !== null) {
			this.#tableNames = Object.keys(type)
			this.#saveData(type)
		}
	}

	#saveData = (data) => {
		localStorage.setItem(this.databaseName, JSON.stringify(data))
	}

	#loadData = () => {
		const data = localStorage.getItem(this.databaseName)
		if (data === null) return null
		else return JSON.parse(data)
	}
}
