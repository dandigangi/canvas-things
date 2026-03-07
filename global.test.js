const { rand, randRgb } = require('./global')

describe('rand', () => {
   it('should return a number between 0 and 5', () => {
      expect(rand({ max: 5 })).toBeGreaterThan(0)
      expect(rand({ max: 5 })).toBeLessThan(5)
   })

   it('should error if no max is provided', () => {
      expect(() => rand({})).toThrow()
   })
})

describe('randRgb', () => {
   it('should return a valid rgb color', () => {
      expect(randRgb()).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/)
   })

   it('should return a valid rgb color with alpha', () => {
      expect(randRgb({ alpha: true })).toMatch(
         /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\) \/ \d{1,3}%\)/,
      )
   })
})
