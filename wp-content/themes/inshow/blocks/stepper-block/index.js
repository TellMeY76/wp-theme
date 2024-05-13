// blocks/stepper-block/index.js
wp.blocks.registerBlockType( 'inshow/stepper-block', {
    title: 'Custom Stepper Block',
    icon: 'format-aside',
    category: 'common',
    attributes: {
        steps: { type: 'array', default: [{ stepText: '', option: '' }] },
    },
    edit: EditComponent,
    save: SaveComponent,
} );

function EditComponent(props) {
    const { attributes: { steps }, setAttributes } = props;

    const addStep = () => {
        setAttributes({ steps: [...steps, { stepText: '', option: '' }] });
    };

    const removeStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setAttributes({ steps: newSteps });
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newSteps = [...steps];
        newSteps[index][name] = value;
        setAttributes({ steps: newSteps });
    };

    return (
        <div className={props.className}>
            {steps.map((step, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="stepText"
                        value={step.stepText}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={`Step ${index + 1} Text`}
                    />
                    <input
                        type="text"
                        name="option"
                        value={step.option}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={`Option for Step ${index + 1}`}
                    />
                    {index !== 0 && (
                        <button onClick={() => removeStep(index)}>Remove Step</button>
                    )}
                </div>
            ))}
            <button onClick={addStep}>Add Step</button>
        </div>
    );
}
function SaveComponent(props) {
    // 保存逻辑，通常返回null，因为复杂UI会在前端通过PHP或JS渲染
    return null;
}