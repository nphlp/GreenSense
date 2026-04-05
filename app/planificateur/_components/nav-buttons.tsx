import Button from "@atoms/button";

type NavButtonsProps = {
    onBack?: () => void;
    onNext?: () => void;
    nextDisabled?: boolean;
    nextLabel?: string;
    backLabel?: string;
};

export default function NavButtons(props: NavButtonsProps) {
    const { onBack, onNext, nextDisabled, nextLabel = "Suivant", backLabel = "Retour" } = props;

    return (
        <div className="flex items-center justify-evenly gap-3">
            <div className="flex-1 md:w-60 md:flex-none">
                {onBack ? (
                    <Button label={backLabel} colors="outline" rounded="full" className="w-full" onClick={onBack} />
                ) : (
                    <div />
                )}
            </div>
            <div className="flex-1 md:w-60 md:flex-none">
                {onNext && (
                    <Button
                        label={nextLabel}
                        colors="solid"
                        rounded="full"
                        className="w-full"
                        onClick={onNext}
                        disabled={nextDisabled}
                    />
                )}
            </div>
        </div>
    );
}
