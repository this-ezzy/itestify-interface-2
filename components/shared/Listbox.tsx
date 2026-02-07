import { FC } from "react";
import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckCircle, ChevronDown } from "@untitled-ui/icons-react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";


type ListboxProps<T extends { [K in keyof T]: T[K] }> = {
  onSelect: (item: T) => void;
  selectedItem: T | null;
  list: T[];
  idField: keyof T;
  ListItem: FC<{ item: T; className?: string }>;
  title?: string;
  hideIcon?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  classes?: {
    container?: string;
    button?: string;
    title?: string;
    options?: string;
    option?: string;
    icon?: string;
  };
};

const Listbox = <T extends object>({
  selectedItem,
  list,
  idField,
  placeholder,
  ListItem,
  hideIcon,
  title,
  classes,
  disabled,
  hasError,
  isLoading,
  onSelect,
}: ListboxProps<T>) => {
  const DEFAULT_OPTION = { id: "", label: "Select…" } as T;
  const controlledValue = selectedItem ?? DEFAULT_OPTION;
  // const DEFAULT_UNDEFINED = process.env.NODE_ENV === "development" ? null : undefined

  return (
    <HeadlessListbox disabled={disabled} value={controlledValue} onChange={onSelect}>
      <div
        data-error={hasError}
        className={twMerge(
          "relative h-[54px] rounded-lg border border-solid border-gray-700 active:border-lime-5  focus-within:border-lime-5 data-error:border-danger",
          classes?.container
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 w-full z-50  top-0 flex justify-end pr-4 items-center ml-auto">
            <Loader2 className="size-5" />
          </div>
        )}

        <ListboxButton
          disabled={isLoading}
          className={twMerge(
            "relative flex h-full w-full cursor-pointer items-center justify-between rounded-lg border-none bg-transparent px-3 py-2",
            classes?.button
          )}
        >
          {selectedItem ? (
            <ListItem item={selectedItem} />
          ) : (
            <EmptyState placeholder={placeholder} />
          )}

          {!hideIcon && !isLoading && (
            <ChevronDown
              className={twMerge("pointer-events-none ml-auto size-5 shrink-0", classes?.icon)}
              aria-hidden="true"
            />
          )}
        </ListboxButton>

        <Transition
          as="div"
          enter="transition ease-in-out duration-100"
          enterFrom="translate-y-2"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-100"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-2"
        >
          <ListboxOptions
            className={twMerge(
              "absolute divide-y divide-gray-700 left-0 mt-2.5 max-h-52  overflow-y-auto z-10 w-full bg-background! text-base shadow-lg border border-gray-700 rounded-lg active:border-none focus:border-none!",
              classes?.options
            )}
          >
            {title && (
              <p className={twMerge("p-3 text-xs font-normal", classes?.title)}>
                {title}
              </p>
            )}

            {list.map((currentItem, index) => {
              const isSelected =
                selectedItem &&
                currentItem[idField] === selectedItem[idField];

              return (
                <ListboxOption
                  key={index}
                  className={twMerge(
                    "relative flex h-full w-full cursor-pointer select-none p-3 pl-2 text-sm",
                    classes?.option
                  )}
                  value={currentItem}
                >
                  <ListItem item={currentItem} />

                  {isSelected && (
                    <span className="pointer-events-none ml-auto flex items-center">
                      <CheckCircle
                        className="size-5 text-lime-5"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Transition>
      </div>
    </HeadlessListbox>
  );
};

const EmptyState: FC<{ placeholder?: string }> = ({ placeholder }) => (
  <div className="text-sm text-neutral-600 font-medium">{placeholder}</div>
);

export default Listbox;
