import { Observable } from "rxjs"

export interface IFileLoaderDialogOptions {
    isLoading: Observable<boolean>
}