export default function validation(recipeData) {
    const errors = {}
  
    if (!recipeData.name) {
      errors.name = 'El campo "name" es obligatorio.'
    } else {
      const trimmedName = recipeData.name.trim();
  
      if (/\d/.test(trimmedName)) {
        errors.name = 'El campo "name" no puede contener números.'
      }
  
      if (trimmedName.length > 60) {
        errors.name = 'El campo "name" no puede tener más de 60 caracteres.'
      }
    }
  
    if (!recipeData.image) {
      errors.image = 'El campo "image" es obligatorio.'
    } else {
      const trimmedImage = recipeData.image.trim();
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(trimmedImage)) {
        errors.image = 'El campo "image" debe ser una URL válida.'
      }
    }
  
    if (!recipeData.summary) {
        errors.summary = 'El campo "summary" es obligatorio.'
      } else {
        if (typeof recipeData.summary !== 'string') {
          errors.summary = 'El campo "summary" debe ser una cadena de texto (string).'
        } else {
          recipeData.summary = recipeData.summary.trim();
        }
      }
  
    if (!recipeData.analyzedInstructions) {
        errors.analyzedInstructions = 'El campo "analyzedInstructions" es obligatorio.'
      } else {
        if (typeof recipeData.analyzedInstructions !== 'string') {
          errors.analyzedInstructions = 'El campo "analyzedInstructions" debe ser una cadena de texto (string).'
        } else {
          recipeData.analyzedInstructions = recipeData.analyzedInstructions.trim();
        }
      }
  
      if (typeof recipeData.healthScore === "undefined") {
        errors.healthScore = 'El campo "healthScore" es obligatorio.'
      } else {
        if (!recipeData.healthScore) {
          errors.healthScore = 'El campo "healthScore" no puede estar vacío.'
        } /*else if (!Number.isInteger(recipeData.healthScore)) {
          errors.healthScore = 'El campo "healthScore" debe ser un número entero.'
        }*/ else {
          recipeData.healthScore = parseInt(recipeData.healthScore);
    
          if (recipeData.healthScore < 0 || recipeData.healthScore > 100) {
            errors.healthScore = 'El campo "healthScore" debe estar entre 0 y 100.'
          }
        }
      }
  
    if (!recipeData.diets) {
      errors.diets = 'El campo "diets" es obligatorio.'
    }
  
    return errors
  }
  