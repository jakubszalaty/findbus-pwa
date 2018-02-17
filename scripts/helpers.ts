/**
 * Sprawdza czy podana flaga istnieje na liście argumentów
 * @param flagName Nazwa flagi (np. -d, --debug)
 */
export const getParam = (flagName: string): any => process.argv.indexOf(flagName) !== -1

/**
 * Pobiera wartość parametru z listy argumentów.
 * Jeśli jest wymagany wyświetla komunikat.
 *
 * @param paramName Nazwa paramteru pod jakim znajduję się wartość
 * @param warning Czy wyświetlić komunikat o braku parametru
 */
export const getParamValue = (paramName: string, warning: boolean = false): any => {
    const paramIndex = process.argv.indexOf(paramName) + 1
    if (paramIndex === 0) {
        return
    }

    if (paramIndex >= process.argv.length) {
        throw new Error(`Parameter ${paramName} value not passed!`)
    }
    return process.argv[paramIndex]
}

/**
 * Helper do ładnego wyświetlania obiektów w konsoli
 * @param obj
 */
export const stringifyObj = (obj: any) => JSON.stringify(obj, null, 4)