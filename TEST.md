# Tester CacheLab

## 1. Lancer le serveur

**Terminal 1 :**

```bash
pnpm start
```

Attendu : `API : http://localhost:3000`

---

## 2. Créer (POST)

**Terminal 2 :**

```bash
curl -s -X POST http://localhost:3000/keys \
  -H 'Content-Type: application/json' \
  -d '{"key":"Mathias","value":"chef de projet"}'
```

---

## 3. Lire (GET)

Navigateur : `http://localhost:3000/keys/Mathias`

```bash
curl -s http://localhost:3000/keys/Mathias
```

---

## 4. Lister les clés

Navigateur : `http://localhost:3000/keys`

```bash
curl -s http://localhost:3000/keys
```

---

## 5. Modifier (PUT)

```bash
curl -s -X PUT http://localhost:3000/keys/Mathias \
  -H 'Content-Type: application/json' \
  -d '{"value":"lead technique"}'
```

---

## 6. Supprimer (DELETE)

```bash
curl -s -X DELETE http://localhost:3000/keys/Mathias -w "\nHTTP %{http_code}\n"
```

Attendu : pas de JSON + `HTTP 204`

---

## 7. Voir les index (debug)

Navigateur : `http://localhost:3000/debug/buckets`

```bash
curl -s http://localhost:3000/debug/buckets
```

---

## 8. mettre plusieurs clés pour voir ou elles se range 

```bash
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Mathias","value":"chef de projet"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Liron","value":"dev backend"}'        
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Lucas","value":"data"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Vanny","value":"design"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Emma","value":"product"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Noah","value":"infra"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Lea","value":"QA"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Hugo","value":"mobile"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Chloe","value":"security"}'
curl -s -X POST http://localhost:3000/keys -H 'Content-Type: application/json' -d '{"key":"Theo","value":"devops"}';  
```

---

## Rappels

- **POST avant GET**, sinon `Clé introuvable`.
- **Redémarrer** `pnpm start` = cache vide, refaire les POST.
- La racine `http://localhost:3000/` n’a pas de route (404 normal).
