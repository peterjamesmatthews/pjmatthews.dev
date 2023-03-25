/**
 * Session Storage
 */
{
	const sessionSpan = <HTMLSpanElement>document.getElementById("session-count");

	let sessionCount = Number.parseInt(
		window.sessionStorage.getItem("count") ?? sessionSpan.textContent ?? "0"
	);
	sessionCount = Number.isNaN(sessionCount) ? 0 : sessionCount;

	sessionSpan.textContent = sessionCount.toString();

	const sessionCounter = <HTMLButtonElement>(
		document.getElementById("session-counter")
	);

	sessionCounter.addEventListener("click", () =>
		window.sessionStorage.setItem(
			"count",
			(sessionSpan.textContent = (++sessionCount).toString())
		)
	);

	const sessionResetter = <HTMLButtonElement>(
		document.getElementById("session-resetter")
	);

	sessionResetter.addEventListener("click", () => {
		window.sessionStorage.clear();
		sessionSpan.textContent = (sessionCount = 0).toString();
	});
}

/**
 * Local Storage
 */
{
	const localSpan = <HTMLSpanElement>document.getElementById("local-count");

	let localCount = Number.parseInt(
		window.localStorage.getItem("count") ?? localSpan.textContent ?? "0"
	);
	localCount = Number.isNaN(localCount) ? 0 : localCount;

	localSpan.textContent = localCount.toString();

	const localCounter = <HTMLButtonElement>(
		document.getElementById("local-counter")
	);

	localCounter.addEventListener("click", () =>
		window.localStorage.setItem(
			"count",
			(localSpan.textContent = (++localCount).toString())
		)
	);

	const localResetter = <HTMLButtonElement>(
		document.getElementById("local-resetter")
	);

	localResetter.addEventListener("click", () => {
		window.localStorage.clear();
		localSpan.textContent = (localCount = 0).toString();
	});
}

/**
 * IndexedDB
 */
{
	let db: IDBDatabase;
	const DBOpenRequest = window.indexedDB.open("counter", 1);
	DBOpenRequest.onsuccess = () => {
		db = DBOpenRequest.result;
		render();
	};
	DBOpenRequest.onupgradeneeded = (event: any) => {
		if (event.target === null) return;

		db = event.target.result;
		db.createObjectStore("counter", { keyPath: "time" });
	};

	const span = <HTMLSpanElement>document.getElementById("indexeddb-count");

	function render() {
		const store = db.transaction("counter").objectStore("counter");
		const cursorRequest = store.openCursor();
		let count = 0;
		cursorRequest.onsuccess = (event: any) => {
			if (event.target === null) return;

			const cursor: IDBCursorWithValue = event.target.result;
			if (!cursor) return (span.textContent = count.toString());

			count++;
			cursor.continue();
		};
	}

	const indexedDBCounter = <HTMLButtonElement>(
		document.getElementById("indexeddb-counter")
	);

	indexedDBCounter.addEventListener("click", () => {
		const transation = db.transaction("counter", "readwrite");
		transation.oncomplete = render;

		const store = transation.objectStore("counter");
		store.add({ time: new Date().toISOString() });
	});

	const indexedDBResetter = <HTMLButtonElement>(
		document.getElementById("indexeddb-resetter")
	);

	indexedDBResetter.addEventListener("click", () => {
		const transaction = db.transaction("counter", "readwrite");
		transaction.oncomplete = render;

		const store = transaction.objectStore("counter");
		store.clear();
	});
}
