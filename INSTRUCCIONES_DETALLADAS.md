# 📚 GUÍA PASO A PASO: Subir tu CV a GitHub Pages

## 🎯 Resultado Final
Tu CV estará disponible en: **https://sierranevadita7-hash.github.io/cv-dashboard**

---

## 📦 PASO 1: Descargar los Archivos

1. Ve a tu terminal de Emergent
2. Ejecuta este comando para crear un ZIP:

```bash
cd /app/github-deploy && zip -r cv-dashboard.zip . -x "node_modules/*" -x ".git/*"
```

3. El archivo `cv-dashboard.zip` estará listo para descargar

**O ALTERNATIVA:** Copia manualmente todos los archivos de `/app/github-deploy` a tu computadora

---

## 🌐 PASO 2: Crear el Repositorio en GitHub

1. **Inicia sesión** en GitHub: https://github.com/login
   - Usuario: `sierranevadita7-hash`

2. **Crea un nuevo repositorio**:
   - Ve a: https://github.com/new
   - **Repository name:** `cv-dashboard`
   - **Description:** "Professional CV Dashboard - Business Intelligence Analyst"
   - **Visibilidad:** ✅ Marca como **Public** (importante para GitHub Pages gratis)
   - ❌ NO marques "Add a README file"
   - ❌ NO marques "Add .gitignore"
   - ❌ NO añadas licencia todavía
   - Haz clic en **"Create repository"**

---

## 📤 PASO 3: Subir los Archivos

### Opción A: Subida Web (MÁS FÁCIL - Recomendado)

1. Después de crear el repositorio, verás una página con instrucciones
2. Haz clic en el link: **"uploading an existing file"**
3. **Descomprime** el archivo `cv-dashboard.zip` en tu computadora
4. **Arrastra TODA la carpeta descomprimida** a la ventana de GitHub
5. IMPORTANTE: Asegúrate de subir:
   - ✅ Carpeta `src` (con todo tu código)
   - ✅ Carpeta `public`
   - ✅ Carpeta `.github` (con el workflow)
   - ✅ Archivo `package.json`
   - ✅ Archivo `README.md`
   - ✅ Archivo `.gitignore`
   - ✅ Archivo `craco.config.js`
   - ✅ Archivo `tailwind.config.js`
   - ❌ NO subas la carpeta `node_modules`
6. En "Commit message" escribe: `Initial commit - CV Dashboard`
7. Haz clic en **"Commit changes"**

### Opción B: Usando Git (Para usuarios avanzados)

Si tienes Git instalado en tu computadora:

```bash
# Navega a la carpeta donde descargaste los archivos
cd ruta/a/cv-dashboard

# Inicializa Git
git init

# Añade todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit - CV Dashboard"

# Renombra la rama a main
git branch -M main

# Conecta con tu repositorio de GitHub
git remote add origin https://github.com/sierranevadita7-hash/cv-dashboard.git

# Sube los archivos
git push -u origin main
```

---

## ⚙️ PASO 4: Activar GitHub Pages

1. Ve a tu repositorio: https://github.com/sierranevadita7-hash/cv-dashboard

2. Haz clic en **"Settings"** (pestaña arriba a la derecha)

3. En el menú lateral izquierdo, busca y haz clic en **"Pages"**

4. En la sección **"Build and deployment"**:
   - **Source:** Selecciona **"GitHub Actions"**
   - (GitHub detectará automáticamente que es una aplicación React)

5. Haz clic en **"Save"** o simplemente deja que se guarde automáticamente

---

## ⏳ PASO 5: Esperar el Deployment

1. Ve a la pestaña **"Actions"** en tu repositorio
   - URL: https://github.com/sierranevadita7-hash/cv-dashboard/actions

2. Verás un workflow llamado **"Deploy to GitHub Pages"** ejecutándose

3. El proceso tarda aproximadamente **2-5 minutos**

4. Puedes ver el progreso en tiempo real:
   - 🟡 Amarillo = En progreso
   - ✅ Verde = Completado exitosamente
   - ❌ Rojo = Error (contacta si ves esto)

5. Cuando veas el ✅ verde, tu CV estará listo

---

## 🎉 PASO 6: Verificar tu CV Online

1. Abre tu navegador

2. Ve a: **https://sierranevadita7-hash.github.io/cv-dashboard**

3. Deberías ver tu CV Dashboard funcionando con:
   - ✅ Botón de cambio de idioma EN/ES
   - ✅ Gráficos interactivos
   - ✅ Botón de descarga de PDF
   - ✅ Todas las secciones funcionando

---

## 📧 PASO 7: Compartir tu CV

Ahora puedes compartir este link permanente:

**https://sierranevadita7-hash.github.io/cv-dashboard**

### Dónde compartirlo:

✅ **Email a reclutadores:**
```
Estimado/a [Nombre],

Adjunto mi CV y además puede ver mi portfolio interactivo en:
https://sierranevadita7-hash.github.io/cv-dashboard

El sitio incluye visualizaciones interactivas de mi experiencia en 
Business Intelligence y permite descargar mi CV en PDF.

Saludos,
José Manuel Ortega García
```

✅ **LinkedIn:** Añádelo en tu sección "Sitio web" o "Portfolio"

✅ **CV en PDF:** Puedes incluir el link en tu CV tradicional

---

## 🔄 ACTUALIZAR TU CV (Futuro)

Si necesitas actualizar tu información:

1. Edita el archivo `src/data/mock.js` en GitHub
2. Haz clic en "Commit changes"
3. GitHub Pages se actualizará automáticamente en 2-3 minutos

---

## ❓ Solución de Problemas

### Problema: "El link no funciona (Error 404)"
**Solución:**
- Espera 5 minutos más (a veces tarda)
- Verifica en Settings > Pages que esté activado
- Revisa que el repositorio sea **Public**, no Private

### Problema: "La página se ve rota o sin estilos"
**Solución:**
- Verifica que el `package.json` tenga: `"homepage": "https://sierranevadita7-hash.github.io/cv-dashboard"`
- Limpia la caché del navegador (Ctrl + Shift + R)

### Problema: "GitHub Actions falla (❌ rojo)"
**Solución:**
- Haz clic en el workflow fallido para ver el error
- Generalmente es por archivos faltantes
- Verifica que subiste TODOS los archivos necesarios

---

## 📞 ¿Necesitas Ayuda?

Si tienes algún problema:
1. Copia el mensaje de error exacto
2. Mándame un screenshot
3. Te ayudaré a solucionarlo

---

## ✨ ¡Listo!

Tu CV Dashboard ya está online y disponible 24/7 de forma **GRATUITA** 🎉

**Link permanente:** https://sierranevadita7-hash.github.io/cv-dashboard
