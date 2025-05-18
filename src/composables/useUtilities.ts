
import { notify } from "notiwind";
interface UseUtilitiesType {
    showNotification: (title: string, text: String, status: string) => void,
    moneyFormat: (amount: number, currencySymbol: string) => string
    validateEmail: (email: string) => boolean
    getCurrentDate: () => string
    getCurrentDateTime: () => string
    isNumeric: (num:string) => boolean
    cleanString:(text:string) => string
}

export function useUtilities(): UseUtilitiesType {
    const moneyFormat = (amount: number , currencySymbol: string): string => {
        return new Intl.NumberFormat().format(amount) + ' ' + currencySymbol.toUpperCase()

    }

    const validateEmail = (email: string):boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    const showNotification = (title: string, text: String, status: string): void => {
        notify({
            group: "top",
            title: title,
            status:status,
            text: text
        }, 10000) // 4s
    }

    const getCurrentDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const getCurrentDateTime = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2,'0')
        let minute = date.getMinutes().toString().padStart(2, '0')

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const isNumeric = (string: any): boolean => {
        return !isNaN(string) && !isNaN(parseFloat(string))
    }

    const cleanString = (text : string): string => {
        return text.replace(/_/g," ")
    }



    return { showNotification, moneyFormat, validateEmail , getCurrentDate, getCurrentDateTime, isNumeric, cleanString}
}