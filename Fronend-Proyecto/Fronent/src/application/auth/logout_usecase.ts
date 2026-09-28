import { tokenStorage } from "../../infrastructure/storage/token_storage";

export function logoutUseCase(): void {
  tokenStorage.eliminar();
}
