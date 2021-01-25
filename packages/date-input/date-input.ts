import DateInputTemplate from './date-input-template.html'
import ErrorTemplate from './error-template.html'
import BaseInputStyles from './base-input-style.html'

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + DateInputTemplate

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

export const tagName = 'ui-date-input'

export class DateInput extends HTMLElement {
  #shadowRoot: ShadowRoot

  #inputContainer: HTMLElement
  #dayInput: HTMLInputElement
  #monthInput: HTMLInputElement
  #yearInput: HTMLInputElement
  #input_1_container: HTMLElement
  #input_2_container: HTMLElement
  #datepicker: HTMLElement
  #datepickerButton: HTMLButtonElement
  #datepickerMonth: HTMLElement
  #datepickerWeekdays: HTMLElement
  #datepickerDays: HTMLElement
  #overlay: HTMLDivElement

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#inputContainer = this.#shadowRoot.querySelector('#inputContainer')! as HTMLElement

    this.#dayInput = this.#shadowRoot.querySelector('#day')! as HTMLInputElement
    this.#monthInput = this.#shadowRoot.querySelector('#month')! as HTMLInputElement
    this.#yearInput = this.#shadowRoot.querySelector('#year')! as HTMLInputElement

    this.#input_1_container = this.#shadowRoot.querySelector('#input_1_container')! as HTMLElement
    this.#input_2_container = this.#shadowRoot.querySelector('#input_2_container')! as HTMLElement

    this.#datepicker = this.#shadowRoot.querySelector('.datepicker')! as HTMLElement
    this.#datepickerButton = this.#shadowRoot.querySelector('.datepicker-icon')! as HTMLButtonElement

    this.#datepickerMonth = this.#shadowRoot.querySelector('.datepicker-month')! as HTMLElement
    this.#datepickerWeekdays = this.#shadowRoot.querySelector('.datepicker-weekdays')! as HTMLElement
    this.#datepickerDays = this.#shadowRoot.querySelector('.datepicker-days')! as HTMLElement
    this.#overlay = this.#shadowRoot.querySelector('.overlay')! as HTMLDivElement
  }

  connectedCallback (): void {
    this.hasAttribute('showpicker') &&
      this.#datepickerButton.classList.remove('hide')

    const locale = this.getAttribute('locale') || 'no'

    if (locale !== 'no') {
      this.#input_1_container.appendChild(this.#monthInput)
      this.#input_2_container.appendChild(this.#dayInput)
    }

    // TODO: Replace with aria
    // if(this.hasAttribute('elementId')) {
    //   this.$dayInput.id = this.getAttribute('elementId')
    // }

    this.#dayInput.addEventListener('input', () => this.handleDayInputChange(locale))
    this.#monthInput.addEventListener('input', () => this.handleMonthInputChange(locale))
    this.#yearInput.addEventListener('input', () => this.handleYearInputChange())
    this.#datepickerButton.addEventListener('click', () => this.handleDatepickerButtonClick(locale))
    this.#overlay.addEventListener('click', () => this.closeDatepicker())

    document.addEventListener('keydown', event => {
      // Esc key
      if (event.code === 'Escape' && !this.#datepicker.classList.contains('open')) {
        this.closeDatepicker()
        return
      }

      // Enter key
      if (event.code === 'Enter' && this.#shadowRoot.activeElement!.classList.contains('datepicker-day')) {
        const dateArray = this.#shadowRoot.activeElement!.getAttribute('datetime')!.split('-')

        this.#dayInput.value = dateArray[2]
        this.#monthInput.value = (parseInt(dateArray[1]) + 1).toString()
        this.#yearInput.value = dateArray[0]

        this.closeDatepicker()
        this.handleDateChange()
      }
    })
  }

  disconnectedCallback (): void {
    this.#dayInput.removeEventListener('input', () => this.handleDayInputChange('no'))
    this.#monthInput.removeEventListener('input', () => this.handleMonthInputChange('no'))
    this.#yearInput.removeEventListener('input', () => this.handleYearInputChange())
    this.#datepickerButton.removeEventListener('click', () => this.handleDatepickerButtonClick('no'))
    this.#overlay.removeEventListener('click', () => this.closeDatepicker())
  }

  static get observedAttributes (): string[] {
    return [
      'errormessage'
    ]
  }

  reset (): void {
    this.#dayInput.value = ''
    this.#monthInput.value = ''
    this.#yearInput.value = ''
    this.handleDateChange()
  }

  handleDateChange (): void {
    let date = ''

    const day = this.#dayInput.value
    const month = this.#monthInput.value
    const year = this.#yearInput.value

    if (day.length > 0 && month.length > 0 && year.length === 4) {
      date = `${year}-${month}-${day}`
    }

    const evt = new CustomEvent('onchange', {
      detail: {
        value: date
      },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(evt)
  }

  handleDayInputChange (locale: string): void {
    let formattedValue = this.#dayInput.value.replace(/\D/g, '')

    if (parseInt(formattedValue) > 31) {
      formattedValue = formattedValue.slice(0, 1)
    }

    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, 2)
    }

    this.#dayInput.value = formattedValue

    this.handleDateChange()
  }

  handleMonthInputChange (locale: string): void {
    let formattedValue = this.#monthInput.value.replace(/\D/g, '')

    if (parseInt(formattedValue) > 12) {
      formattedValue = formattedValue.slice(0, 1)
    }

    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, 2)
    }

    this.#monthInput.value = formattedValue

    this.handleDateChange()
  }

  handleYearInputChange (): void {
    const valueOnlyNumbers = this.#yearInput.value.replace(/\D/g, '')
    this.#yearInput.value = parseInt(valueOnlyNumbers) <= 4 ? valueOnlyNumbers : valueOnlyNumbers.slice(0, 4)

    this.handleDateChange()
  }

  handleDatepickerButtonClick (locale: string): void {
    if (!this.#datepicker.classList.contains('hide')) {
      this.#datepicker.classList.add('hide')
      this.#overlay.classList.remove('visible')
      return
    }

    this.#datepicker.classList.remove('hide')
    this.#overlay.classList.add('visible')

    this.renderCalendar(locale)
  }

  handleChangeMonth (locale: string, year: number, month: number, day: number): void {
    this.renderCalendar(locale, new Date(year, month + 1, day))
  }

  handleDayClick (year: number, month: number, day: number): void {
    this.#dayInput.value = day.toString()
    this.#monthInput.value = (month + 1).toString()
    this.#yearInput.value = year.toString()
    this.closeDatepicker()
    this.handleDateChange()
  }

  closeDatepicker () {
    this.#datepicker.classList.add('hide')
    this.#overlay.classList.remove('visible')
  }

  renderCalendar (locale: string, date = new Date()): void {
    this.#datepickerMonth.innerHTML = ''
    this.#datepickerWeekdays.innerHTML = ''
    this.#datepickerDays.innerHTML = ''

    const weekdays = locale === 'en'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['M', 'T', 'O', 'T', 'F', 'L', 'S']

    const months = locale === 'en'
      ? ['Januar', 'Februar', 'Mars', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December']
      : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    const year = date.getFullYear()
    const monthByNumber = date.getMonth()
    const monthByName = months[monthByNumber]
    const prevMonth = new Date(year, monthByNumber, 0)
    const nextMonth = new Date(year, monthByNumber + 2, 0)
    const daysInPrevMonth = prevMonth.getDate()
    const daysInMonth = new Date(year, monthByNumber + 1, 0).getDate()

    const today = new Date().getDate()

    // Month
    const monthTextEl = document.createElement('time')
    monthTextEl.classList.add('datepicker-month-text')
    monthTextEl.setAttribute('datetime', `${year}-${monthByNumber}`)
    monthTextEl.setAttribute('tabindex', '-1')
    monthTextEl.innerHTML = `${monthByName} ${year}`
    this.#datepickerMonth.appendChild(monthTextEl)

    const prevMonthButton = document.createElement('button')
    prevMonthButton.classList.add('datepicker-prev-month')
    prevMonthButton.addEventListener('click', () => this.handleChangeMonth(locale, prevMonth.getFullYear(), prevMonth.getMonth(), 0))
    this.#datepickerMonth.appendChild(prevMonthButton)

    const nextMonthButton = document.createElement('button')
    nextMonthButton.classList.add('datepicker-next-month')
    nextMonthButton.addEventListener('click', () => this.handleChangeMonth(locale, nextMonth.getFullYear(), nextMonth.getMonth(), 0))
    this.#datepickerMonth.appendChild(nextMonthButton)

    // Weekdays
    const weekdaysTemplate = document.createElement('template')
    weekdaysTemplate.innerHTML = weekdays.map(weekday => `<div class="datepicker-weekday">${weekday}</div>`).join('')
    this.#datepickerWeekdays.appendChild(weekdaysTemplate.content.cloneNode(true))

    // Days
    const firstDayInMonth = new Date(year, monthByNumber, 1).getDay()
    const lastDayInMonth = new Date(year, monthByNumber, daysInMonth).getDay()
    const numberOfDaysFromPreviousMonth = 7 - (7 - firstDayInMonth + 1)
    const numberOfDaysFromNextMonth = 7 - (lastDayInMonth + 1)

    // Days from previous month
    if (numberOfDaysFromPreviousMonth > 0) {
      for (let i = (daysInPrevMonth - numberOfDaysFromPreviousMonth); i <= daysInPrevMonth; i++) {
        const timeEl = document.createElement('time')
        timeEl.setAttribute('tabindex', '-1')
        timeEl.innerHTML = i.toString()
        timeEl.classList.add('datepicker-day', 'datepicker-day-previous-month')
        timeEl.setAttribute('datetime', `${prevMonth.getFullYear()}-${prevMonth.getMonth()}-${i}`)
        timeEl.addEventListener('click', () => this.handleDayClick(prevMonth.getFullYear(), prevMonth.getMonth(), i))
        this.#datepickerDays.appendChild(timeEl)
      }
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const timeEl = document.createElement('time')
      timeEl.setAttribute('tabindex', '-1')
      timeEl.innerHTML = i.toString()
      timeEl.classList.add('datepicker-day')
      today === i && timeEl.classList.add('datepicker-today')
      timeEl.setAttribute('datetime', `${year}-${monthByNumber}-${i}`)
      timeEl.addEventListener('click', () => this.handleDayClick(year, monthByNumber, i))
      this.#datepickerDays.appendChild(timeEl)
    }

    // Days in next month
    for (let i = 1; i <= numberOfDaysFromNextMonth; i++) {
      const timeEl = document.createElement('time')
      timeEl.setAttribute('tabindex', '-1')
      timeEl.innerHTML = i.toString()
      timeEl.classList.add('datepicker-day', 'datepicker-day-next-month')
      timeEl.setAttribute('datetime', `${nextMonth.getFullYear()}-${nextMonth.getMonth()}-${i}`)
      timeEl.addEventListener('click', () => this.handleDayClick(nextMonth.getFullYear(), nextMonth.getMonth(), i))
      this.#datepickerDays.appendChild(timeEl)
    }
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'errormessage':
          newVal
            ? this.addError(newVal)
            : this.removeError()
          break
        default:
          console.log('Changed unknown attribute:', attrName)
      }
    }
  }

  addError (errorMessage: string): void {
    this.#inputContainer.classList.add('error')
    this.#inputContainer.setAttribute('aria-invalid', 'true')

    this.#shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    const error = this.#shadowRoot.querySelector('#errorContainer')! as HTMLElement
    error.innerText = errorMessage
  }

  removeError (): void {
    this.#inputContainer.classList.remove('error')
    this.#inputContainer.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('#errorContainer')!
    error && this.#shadowRoot.removeChild(error)
  }
}
