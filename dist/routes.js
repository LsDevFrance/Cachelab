import http from "node:http";
const PORT = Number(process.env["PORT"] ?? 3000);
function json(res, status, body) {
    if (body === undefined) {
        res.writeHead(status);
        res.end();
        return;
    }
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
}
async function readBody(req) {
    const parts = [];
    for await (const chunk of req)
        parts.push(chunk);
    const text = Buffer.concat(parts).toString("utf8").trim();
    return text ? JSON.parse(text) : {};
}
function isJsonObject(v) {
    return typeof v === "object" && v !== null;
}
/** Une seule HashMap partagée par toutes les requêtes (mémoire du cache). */
export function createServer(store) {
    return http.createServer(async (req, res) => {
        if (!req.url || !req.method) {
            json(res, 400, { error: "Requête invalide" });
            return;
        }
        const path = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
        try {
            // GET /keys — optionnel : liste des clés
            if (req.method === "GET" && path === "/keys") {
                json(res, 200, { keys: store.keys() });
                return;
            }
            if (req.method === "GET" && path === "/debug/buckets") {
                json(res, 200, store.debugBuckets());
                return;
            }
            // POST /keys — créer
            if (req.method === "POST" && path === "/keys") {
                const body = await readBody(req);
                if (!isJsonObject(body) ||
                    typeof body["key"] !== "string" ||
                    typeof body["value"] !== "string") {
                    json(res, 400, { error: 'JSON attendu : { "key": "...", "value": "..." }' });
                    return;
                }
                if (store.get(body["key"]) !== null) {
                    json(res, 409, { error: "Clé déjà existante" });
                    return;
                }
                store.set(body["key"], body["value"]);
                json(res, 201, { key: body["key"], value: body["value"] });
                return;
            }
            const match = /^\/keys\/([^/]+)$/.exec(path);
            if (!match) {
                json(res, 404, { error: "Route introuvable" });
                return;
            }
            const key = decodeURIComponent(match[1]);
            if (req.method === "GET") {
                const value = store.get(key);
                if (value === null) {
                    json(res, 404, { error: "Clé introuvable" });
                    return;
                }
                json(res, 200, { key, value });
                return;
            }
            if (req.method === "PUT") {
                const body = await readBody(req);
                if (!isJsonObject(body) || typeof body["value"] !== "string") {
                    json(res, 400, { error: 'JSON attendu : { "value": "..." }' });
                    return;
                }
                if (store.get(key) === null) {
                    json(res, 404, { error: "Clé introuvable" });
                    return;
                }
                store.set(key, body["value"]);
                json(res, 200, { key, value: body["value"] });
                return;
            }
            if (req.method === "DELETE") {
                if (!store.delete(key)) {
                    json(res, 404, { error: "Clé introuvable" });
                    return;
                }
                json(res, 204);
                return;
            }
            json(res, 404, { error: "Route introuvable" });
        }
        catch {
            json(res, 400, { error: "JSON invalide" });
        }
    });
}
export function listen(store) {
    createServer(store).listen(PORT, () => {
        console.log(`API : http://localhost:${PORT}`);
    });
}
//# sourceMappingURL=routes.js.map