interface IShared {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
  toggleShowMenu: () => void;
}

export type { IShared };
