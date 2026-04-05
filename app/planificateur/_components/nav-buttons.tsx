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
        <div className="flex justify-between gap-2">
            <div>{onBack && <Button label={backLabel} colors="outline" onClick={onBack} />}</div>
            <div>
                {onNext && <Button label={nextLabel} colors="primary" onClick={onNext} disabled={nextDisabled} />}
            </div>
        </div>
    );
}
