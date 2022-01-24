import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", {
				keyPath: "id",
				autoIncrement: true,
			});
			console.log("jate database created");
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
//original code
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
	console.log("PUT to the database");
	const todosDb = await openDB("todos", 1);
	const tx = todosDb.transaction("todos", "readwrite");
	const store = tx.objectStore("todos");
	const request = store.put({ id: id, todo: content });
	const result = await request;
	console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
//original code
// export const getDb = async () => console.error("getDb not implemented");
export const getOneDb = async () => {
	console.log("GET from the database");
	const todosDb = await openDB("todos", 1);
	const tx = todosDb.transaction("todos", "readonly");
	const store = tx.objectStore("todos");
	const request = store.get();
	const result = await request;
	console.log("result.value", result);
	return result;
};

initdb();
