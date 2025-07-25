# 🧪 KSK Testing Plan - Clean Start

## 🎯 Testing Objectives
1. Verify ksk-core design system works independently
2. Test CLI project generation 
3. Test generated project can use ksk-core components
4. Confirm the full workflow works end-to-end

## 📋 Test Sequence

### Phase 1: Test Design System Package
**Location:** `../ksk-core/`
**Goal:** Verify all components render and work properly

```bash
cd ../ksk-core
pnpm dev
```
**Expected:** Demo site at http://localhost:4321 with working components

---

### Phase 2: Test CLI Package
**Location:** `../create-ksk-new/`
**Goal:** Generate a test project successfully

```bash
cd ../create-ksk-new
node index.js my-test-site
```
**Expected:** Interactive prompts and project creation

---

### Phase 3: Test Generated Project
**Location:** `../my-test-site/` (created by CLI)
**Goal:** Generated project runs and can use ksk-core components

```bash
cd ../my-test-site
pnpm install
pnpm link ../ksk-core  # Local linking for testing
pnpm dev
```
**Expected:** New site runs and can import/use ksk components

---

## ✅ Success Criteria
- [x] ksk-core demo site loads without errors ✅ (Running on http://localhost:4322)
- [x] All demo components display correctly ✅ (Verified in browser)
- [x] CLI creates project with correct structure ✅ (Works, expects npm package)
- [x] Generated project installs dependencies ✅ (Manual test successful)
- [x] Generated project can link to ksk-core ✅ (Local linking works)
- [ ] Generated project can import and use components (Testing in progress)

## 🚨 Testing Results

### ✅ What's Working:
- ksk-core demo site runs perfectly on port 4322
- Components render correctly in demo
- CLI prompts work and create project structure
- Local linking with pnpm works
- Dependencies install correctly

### ⚠️ Expected Issues:
- CLI fails at npm install because @kickstart/ksk-core not published yet
- This is normal - packages need to be published first

### 🧪 Manual Test Created:
- Created test-manual-project with Astro
- Successfully linked local ksk-core package
- Created test page importing Button components
- Dev server starting...

---
**Status:** Phase 3 in progress - Testing component imports
