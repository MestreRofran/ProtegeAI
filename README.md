# ProtegeAI APP PWA

## Segurança e armazenamento

- Os dados ficam criptografados no IndexedDB da origem usada e, com permissão, em pasta local. A pasta pode exigir reconexão após fechar o navegador. A API de pastas pode estar indisponível em navegadores móveis; use backups criptografados como contingência.
- Ao **Mesclar**, o app solicita a senha do backup e descriptografa em memória; une perfis com mesmo nome (ignorando diferença de maiúsculas/minúsculas), mantém as versões de cartões pela data `updatedAt` e acrescenta campos ausentes. Cartões correspondem por ID; caso não coincidam, por **tipo + título + login** únicos. Registros antigos sem datas confiáveis são mantidos preferencialmente do cofre atual.
- Antes de qualquer importação, o cofre anterior é guardado criptografado no navegador para uma restauração. **Exporte um backup separado também**, pois limpar dados do navegador remove esse histórico.
- A biometria só pode desbloquear quando o autenticador e o navegador oferecem WebAuthn **PRF** para proteger a chave AES. A biometria/PIN é controlada pelo sistema, e não pelo HTML. Nem todos os dispositivos Android/Windows são compatíveis. É preciso ativar em Configurações → Segurança, usando a senha mestra primeiro; mudar de origem exige novo cadastro.
- No GitHub Pages os arquivos do aplicativo são públicos; **o cofre criptografado não é enviado ao GitHub automaticamente**. Não comite nenhum backup para o repositório, pois mesmo criptografado ele pode ser atacado offline.
- O service worker mantém offline somente o aplicativo e os ícones; não armazena backups nem respostas com dados privados no Cache Storage.

## Observações

Em celulares, a instalação e a disponibilidade das APIs de arquivos variam por navegador e versão do sistema. O PWA não garante acesso persistente à pasta nem biometria em todos os aparelhos. Use HTTPS e verifique os botões de status antes de depender apenas do dispositivo.

Versão: 1.3 a 1.7 · 11/10/2026
