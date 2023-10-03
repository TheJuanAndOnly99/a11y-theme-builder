﻿/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */

import React, { ReactNode, useEffect, useState } from 'react';
import { Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Atom, Molecule, Organism } from 'a11y-theme-builder-sdk';
//import { FormattedMessage } from 'react-intl';
import { LocaleMessage } from '../../locales/LocaleMessage';

interface Props {
    item: Atom | Molecule | Organism;
}

export const GeneratedCodeSection: React.FC<Props> = ({ item }) => {

    const [tabIndex, setTabIndex] = useState<string>("css");
    const handleTabChange = (event: any, newTabIndex: string) => {
        setTabIndex(newTabIndex);
    };

    const name = item.name;
    const getType = () => {
        if (item instanceof Atom) {
            return "Atom"
        }
        if (item instanceof Molecule) {
            return "Molecule"
        }
        if (item instanceof Organism) {
            return "Organism"
        }
        return "";
    }

    const vg = item.getDesignSystem().getCSSVarGroup(item);
    const vars = vg.vars;
    const renderCssCode = () => {
        const r = [];
        for (var key in vars) {
            r.push(
                <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{vars[key]}</TableCell>
                    <TableCell><LocaleMessage id={key}/></TableCell>
                </TableRow>
            )
        }
        return r;
    }
    const [cssTableBody, setCssTableBody] = useState<ReactNode>(renderCssCode());
    const [jsonTableBody, setJsonTableBody] = useState<ReactNode>();
    useEffect(() => {
        vg.setListener("gcs", function(varGroup) {
            setCssTableBody(renderCssCode());
        })
    }, [])

    const codeStyle = {
        paddingTop: "0px",
        paddingLeft: "20px",
        paddingBottom: "20px",
        paddingRight: "20px",
    }

    const tabBar = {
        backgroundColor: "var(--transparent)",
        color: "var(--transparent)",
        display: "flex",
    }

    return (
        <div className="top40">
            <h6 className="section-header">Generated Code</h6>
            <div className="section-body">
                The following code is generated by the {name} {getType()}.
                <div className="top40" style={{ border: "1px solid black" }}>
                    <div style={codeStyle}>
                        {tabIndex === "css" && (
                            <>
                                <div/>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>CSS Variable</TableCell>
                                                <TableCell>Value</TableCell>
                                                <TableCell>Description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cssTableBody}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                        {tabIndex === "json" && (
                            <>
                                The following JSON is generated by the {name} {getType()}.
                                <div className="top40" />
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>CSS Variable</TableCell>
                                                <TableCell>Value</TableCell>
                                                <TableCell>Description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {jsonTableBody}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
