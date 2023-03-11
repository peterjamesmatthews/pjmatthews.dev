/* eslint-disable no-debugger */
/**
 * Session Storage
 */
{
  const sessionSpan = <HTMLSpanElement>document.getElementById("session-count");

  let sessionCount = Number.parseInt(
    window.sessionStorage.getItem("count") ?? sessionSpan.textContent
  );
  sessionCount = Number.isNaN(sessionCount) ? 0 : sessionCount;

  sessionSpan.textContent = sessionCount.toString();

  document
    .getElementById("session-counter")
    .addEventListener("click", () =>
      window.sessionStorage.setItem(
        "count",
        (sessionSpan.textContent = (++sessionCount).toString())
      )
    );

  document.getElementById("session-resetter").addEventListener("click", () => {
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
    window.localStorage.getItem("count") ?? localSpan.textContent
  );
  localCount = Number.isNaN(localCount) ? 0 : localCount;

  localSpan.textContent = localCount.toString();

  document
    .getElementById("local-counter")
    .addEventListener("click", () =>
      window.localStorage.setItem(
        "count",
        (localSpan.textContent = (++localCount).toString())
      )
    );

  document.getElementById("local-resetter").addEventListener("click", () => {
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
  DBOpenRequest.onupgradeneeded = (event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db = event.target.result;
    db.createObjectStore("counter", { keyPath: "time" });
  };

  const span = <HTMLSpanElement>document.getElementById("indexeddb-count");

  // eslint-disable-next-line no-inner-declarations
  function render() {
    const store = db.transaction("counter").objectStore("counter");
    const cursorRequest = store.openCursor();
    let count = 0;
    cursorRequest.onsuccess = (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const cursor: IDBCursorWithValue = event.target.result;
      if (!cursor) return (span.textContent = count.toString());
      count++;
      cursor.continue();
    };
  }

  document.getElementById("indexeddb-counter").addEventListener("click", () => {
    const transation = db.transaction("counter", "readwrite");
    transation.oncomplete = render;

    const store = transation.objectStore("counter");
    store.add({ time: new Date().toISOString() });
  });

  document
    .getElementById("indexeddb-resetter")
    .addEventListener("click", () => {
      const transaction = db.transaction("counter", "readwrite");
      transaction.oncomplete = render;

      const store = transaction.objectStore("counter");
      store.clear();
    });
}

export {};
