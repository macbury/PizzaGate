import CalculatorStore from '../CalculatorStore'

describe('Basic calculation test', () => {
  const rootMock : any = {}

  it('for default values', () => {
    const calc = new CalculatorStore(rootMock)

    expect(calc.hydration).toBe(65)
    expect(calc.flour).toBe(475)
    expect(calc.water).toBe(309)
    expect(calc.salt).toBe(15)
    expect(calc.fats).toBe(0)
    expect(calc.yeast).toBe(0.14)
  })

  it('with additional fat', () => {
    const calc = new CalculatorStore(rootMock)
    calc.setWantedFats(2)

    expect(calc.hydration).toBe(65)
    expect(calc.flour).toBe(475)
    expect(calc.water).toBe(309)
    expect(calc.salt).toBe(15)
    expect(calc.fats).toBe(1)
    expect(calc.yeast).toBe(0.14)
  })

  it('other recipe', () => {
    const calc = new CalculatorStore(rootMock)

    calc.setNumberOfBalls(3)
    calc.setWantedFats(2)
    calc.setDoughWeight(240)
    calc.setWantedHydration(80)
    calc.setWantedSalt(60)
    calc.setWantedFats(4)

    calc.setRisingTime(20)
    calc.setFridgeRisingTime(4)
    calc.setTemperature(23)
    calc.setGrandmaPizza(true)

    expect(calc.hydration).toBe(80)
    expect(calc.flour).toBe(389)
    expect(calc.water).toBe(311)
    expect(calc.salt).toBe(19)
    expect(calc.fats).toBe(1)
    expect(calc.yeast).toBe(0.53)
  })
})
