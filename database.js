export default class Database {
	databaseName = ""
	#debug = 0

	/**
	 * you can decide the type of the database you want to use:
	 * 	- new database
	 * 	- fetch from localStorage
	 * @param {string} name name of the database that will be saved as a key on localStorage
	 * @param {object | false}  initData data object if you want to make new database and false if you want to use the database that is saved in local storage
	 * @param {number} debug 2 for error and logs, 1 inly for errors and 0 for nothing
	 */
	constructor(name, initData, debug = 0) {
		// initialize debug condition
		this.#debug = debug

		this.databaseName = name
		this.#log("database.js-constructor: database is created with this name:", this.databaseName)

		// if the initData is object
		if (typeof initData === "object" && !Array.isArray(initData) && initData !== null) {
			this.#saveData(initData)
			this.#log("database.js-constructor: database initialized with given database")
		}
		// fetch data from localStorage
		else if (initData === false) {
			this.#log("database.js-constructor: database initialized with data in the localStorage")
		}
		// if the given initData is not valid
		else {
			this.#error('database.js-constructor: try again and use true or data object in "initData" parameter')
		}
	}

	/**
	 * saves given data in browser's local storage
	 * @param {object} data
	 */
	#saveData = (data) => {
		const stringified = JSON.stringify(data)
		const encoded = btoa(stringified)
		localStorage.setItem(this.databaseName, encoded)
		this.#log("database.js-saveData: data succesfully saved in localStorage")
	}

	/**
	 * loads data from browsers localStorage with current database key
	 * @returns data
	 */
	#loadData = () => {
		const stringified = localStorage.getItem(this.databaseName)
		if (stringified === null) {
			this.#error("database.js-loadData: data didnt load because it was null")
			return false
		}

		this.#log("database.js-loadData: data loaded succcesfully")
		const decoded = atob(stringified)
		return JSON.parse(decoded)
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

	/**
	 * checks if the given table name exist in database or not
	 * @param {string } inpuName table name that you want to make sure that its exist or not
	 * @returns {string | false} the name of the table if its found and false if it doesnt
	 */
	#checkTableName(inpuName) {
		const tableNames = Object.keys(this.#loadData())

		for (let index = 0; index < tableNames.length; index++) {
			const table = tableNames[index]
			if (inpuName === table) {
				this.#log("database.js-checkTableName: the table that you are looking for is", table, "and exists")
				return table
			}
		}

		this.#error("database.js-checkTableName: table doesnt exist")
		return false
	}
}
