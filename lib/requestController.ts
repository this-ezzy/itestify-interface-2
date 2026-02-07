class RequestController {
  private static instance?: RequestController

  private controllers: Record<string, AbortController | undefined> = {}
  private timeouts: Record<string, NodeJS.Timeout> = {}

  private constructor() { }

  static getInstance() {
    RequestController.instance ??= new RequestController();
    return RequestController.instance
  }

  getAbortSignal(id: string) {
    this.controllers[id]?.abort()
    this.controllers[id] = new AbortController()
    return this.controllers[id]!.signal
  }

  debounce(id: string, fn: () => void, delay = 500) {
    clearTimeout(this.timeouts[id])
    this.timeouts[id] = setTimeout(fn, delay)
  }
}

const requestController = RequestController.getInstance()

export default requestController
