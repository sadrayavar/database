export default class Database {
	databaseName = ""
	#debug = 0

	/**
	 * you can decide the type of the database you want to use:
	 * 	- new database
	 * 	- fetch from localStorage
	 * @param {string} name name of the database that will be saved as a key on localStorage
	 * @param {true}  type true if you want to use the database that is saved in local storage and data object if you want to make new database
	 * @param {number} debug 2 for error and logs, 1 inly for errors and 0 for nothing
	 */
	constructor(name, type, debug = 0) {
		// initialize debug condition
		this.#debug = debug

		this.databaseName = name
		this.#log("database.js-constructor: database is created with this name:", this.databaseName)

		// fetch data from localStorage
		if (type === true) {
			this.#log("database.js-constructor: database initialized with data in the localStorage")
		}
		// if the type is object
		else if (typeof type === "object" && !Array.isArray(type) && type !== null) {
			this.#saveData(type)
			this.#log("database.js-constructor: database initialized with given database")
		}
		// if the given type is not valid
		else {
			this.#error('database.js-constructor: try again and use true or data object in "type" parameter')
		}
	}

	/**
	 * saves given data in browser's local storage
	 * @param {object} data
	 */
	#saveData = (data) => {
		localStorage.setItem(this.databaseName, JSON.stringify(data))
	}

	/**
	 * loads data from browsers localStorage with current database key
	 * @returns data
	 */
	#loadData = () => {
		const data = localStorage.getItem(this.databaseName)
		if (data === null) return null
		else return JSON.parse(data)
	}

	/**
	 * logs input in the console if #debug key is true
	 * @param {*} input
	 */
	#log(...input) {
		if (this.#debug === 2) console.log(...input)
	}

	/**
	 * logs input in the console as error if #debug key is true
	 * @param {*} input
	 */
	#error(...input) {
		if (this.#debug >= 1) console.error(...input)
	}
}
