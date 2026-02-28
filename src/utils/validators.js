export const validateMobile = (mobile) => {
  const regex = /^[0-9]{10}$/
  return regex.test(mobile)
}

export const validateOtp = (otp) => {
  const regex = /^[0-9]{6}$/
  return regex.test(otp)
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePrice = (price) => {
  return price > 0
}

export const validateProductTitle = (title) => {
  return title && title.length >= 5 && title.length <= 200
}

export const validateDescription = (desc) => {
  return !desc || desc.length <= 2000
}

export const validateStock = (stock) => {
  return stock >= 0
}

export const validateMOQ = (moq) => {
  return moq >= 1
}