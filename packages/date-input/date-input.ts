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

  get id (): string {
    return this.getAttribute('data-id') || ''
  }

  get locale (): string {
    return this.getAttribute('locale') || 'no'
  }

  get hidepicker (): boolean {
    return this.hasAttribute('hidepicker')
  }

  connectedCallback (): void {
    if (this.id) {
      this.#inputContainer.id = this.id
    }

    this.hidepicker &&
      this.#datepickerButton.classList.add('hide')

    if (this.locale !== 'no') {
      this.#input_1_container.appendChild(this.#monthInput)
      this.#input_2_container.appendChild(this.#dayInput)
    }

    this.#dayInput.addEventListener('input', () => this.handleDayInputChange())
    this.#monthInput.addEventListener('input', () => this.handleMonthInputChange())
    this.#yearInput.addEventListener('input', () => this.handleYearInputChange())
    this.#datepickerButton.addEventListener('click', () => this.handleDatepickerButtonClick())
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
    this.#dayInput.removeEventListener('input', () => this.handleDayInputChange())
    this.#monthInput.removeEventListener('input', () => this.handleMonthInputChange())
    this.#yearInput.removeEventListener('input', () => this.handleYearInputChange())
    this.#datepickerButton.removeEventListener('click', () => this.handleDatepickerButtonClick())
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

  handleDayInputChange (): void {
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

  handleMonthInputChange (): void {
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

  handleDatepickerButtonClick (): void {
    if (!this.#datepicker.classList.contains('hide')) {
      this.#datepicker.classList.add('hide')
      this.#overlay.classList.remove('visible')
      return
    }

    this.#datepicker.classList.remove('hide')
    this.#overlay.classList.add('visible')

    this.renderCalendar()
  }

  handleChangeMonth (year: number, month: number, day: number): void {
    this.renderCalendar(new Date(year, month + 1, day))
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

  renderCalendar (date = new Date()): void {
    this.#datepickerMonth.innerHTML = ''
    this.#datepickerWeekdays.innerHTML = ''
    this.#datepickerDays.innerHTML = ''

    const weekdays = this.locale === 'en'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['M', 'T', 'O', 'T', 'F', 'L', 'S']

    const months = this.locale === 'en'
      ? ['Januar', 'Februar', 'Mars', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December']
      : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    const year = date.getFullYear()
    const monthByNumber = date.getMonth()
    const monthByName = months[monthByNumber]
    const prevMonth = new Date(year, monthByNumber, 0)
    const nextMonth = new Date(year, monthByNumber + 2, 0)
    const daysInPrevMonth = prevMonth.getDate()
    const daysInMonth = new Date(year, monthByNumber + 1, 0).getDate()

    const today = new Date()
    const isCurrentDateToday = (day: number): boolean => today.getMonth() === monthByNumber && today.getDate() === day

    // Month
    const monthTextEl = document.createElement('time')
    monthTextEl.classList.add('datepicker-month-text')
    monthTextEl.setAttribute('datetime', `${year}-${monthByNumber}`)
    monthTextEl.setAttribute('tabindex', '-1')
    monthTextEl.innerHTML = `${monthByName} ${year}`
    monthTextEl.setAttribute('aria-live', 'polite')
    this.#datepickerMonth.appendChild(monthTextEl)

    const prevMonthButton = document.createElement('button')
    prevMonthButton.setAttribute('aria-label', this.locale === 'no' ? 'forrige måned' : 'previous month')
    prevMonthButton.classList.add('datepicker-prev-month')
    prevMonthButton.addEventListener('click', () => this.handleChangeMonth(prevMonth.getFullYear(), prevMonth.getMonth(), 0))
    this.#datepickerMonth.appendChild(prevMonthButton)

    const nextMonthButton = document.createElement('button')
    nextMonthButton.setAttribute('aria-label', this.locale === 'no' ? 'neste måned' : 'next month')
    nextMonthButton.classList.add('datepicker-next-month')
    nextMonthButton.addEventListener('click', () => this.handleChangeMonth(nextMonth.getFullYear(), nextMonth.getMonth(), 0))
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
        const buttonEl = document.createElement('button')
        const timeEl = document.createElement('time')

        timeEl.innerHTML = i.toString()
        buttonEl.classList.add('datepicker-day', 'datepicker-day-previous-month')
        timeEl.setAttribute('datetime', `${prevMonth.getFullYear()}-${prevMonth.getMonth() + 1}-${i}`)
        buttonEl.addEventListener('click', () => this.handleDayClick(prevMonth.getFullYear(), prevMonth.getMonth(), i))
        buttonEl.appendChild(timeEl)
        this.#datepickerDays.appendChild(buttonEl)
      }
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const buttonEl = document.createElement('button')
      const timeEl = document.createElement('time')

      timeEl.innerHTML = i.toString()
      buttonEl.classList.add('datepicker-day')
      isCurrentDateToday(i) && buttonEl.classList.add('datepicker-today')
      timeEl.setAttribute('datetime', `${year}-${monthByNumber + 1}-${i}`)
      buttonEl.addEventListener('click', () => this.handleDayClick(year, monthByNumber, i))
      buttonEl.appendChild(timeEl)
      this.#datepickerDays.appendChild(buttonEl)
    }

    // Days in next month
    // TODO: Fix number of days
    for (let i = 1; i <= numberOfDaysFromNextMonth; i++) {
      const buttonEl = document.createElement('button')
      const timeEl = document.createElement('time')

      timeEl.innerHTML = i.toString()
      buttonEl.classList.add('datepicker-day', 'datepicker-day-next-month')
      timeEl.setAttribute('datetime', `${nextMonth.getFullYear()}-${nextMonth.getMonth() + 1}-${i}`)
      buttonEl.addEventListener('click', () => this.handleDayClick(nextMonth.getFullYear(), nextMonth.getMonth(), i))
      buttonEl.appendChild(timeEl)
      this.#datepickerDays.appendChild(buttonEl)
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
          console.warn('Unknown attribute:', attrName)
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
